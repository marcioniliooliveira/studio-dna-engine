# Pillar 9: OKLCH Perceptual Color Synthesis & Relational Palettes

**Document ID:** `DOC-RESEARCH-V26-PILAR-09`  
**System:** Studio DNA PRO v2.6 (`studio-dna-engine`)  
**Status:** Implementation-Grade Architectural Specification  
**Classification:** `[observed]` (codebase tests), `[documented]` (Ottosson 2020 & W3C Color 4 specifications), `[inferred]` (mathematical derivations)

---

## 1. Executive Summary & Resolution of Limitations L3 and L4

In Studio DNA PRO v2.5, chromatic adaptation suffered from two major limitations:
- **Limitation L3 (`src/constraints/contrast.js`):** Colors were analyzed in raw sRGB or standard HSL space (`[observed]`), where blue has an apparent perceived lightness far lower than yellow at the same mathematical value ($L=0.5$).
- **Limitation L4 (`src/components/WorkStage/referenceData.ts`):** Colors were statically hardcoded as hex values (e.g. `#FAF9F6`, `#262220`), preventing programmatic brand transposition across clients (`[observed]`).

Pillar 9 transitions Studio DNA PRO v2.6 completely to the **OKLCH** perceptual color space (Ottosson, 2020; W3C CSS Color 4). It establishes:
1. **Exact Bidirectional Matrix Transformations:** Closed-form conversions between non-linear $s\text{RGB}$ and cylindrical $\text{OKLCH}(L, C, h)$ via the human cone photoreceptor LMS response space and Cartesian Oklab.
2. **Semantic Role Classification:** Automatic sorting of arbitrary palette swatches into functional UI roles (`bg`, `surface`, `border`, `fg`, `accent`) based on lightness and chroma quantiles.
3. **Relational Palette Projection:** Transmuting reference site color themes to client brand identities while strictly preserving perceptual lightness contrast deltas ($\Delta L_i$).

---

## 2. Forward Transformation: $s\text{RGB} \to \text{OKLCH}$

Given non-linear $s\text{RGB}$ coordinates $R, G, B \in [0, 1]$ (derived from 8-bit integers by dividing by $255$):

### Step 1: sRGB Linearization (Inverse Electro-Optical Transfer Function)
For each channel $C \in \{R, G, B\}$:
$$\text{Eq. 30a:} \quad C_{\text{lin}} = \begin{cases}
\dfrac{C}{12.92}, & \text{if } C \le 0.04045 \\[8pt]
\left( \dfrac{C + 0.055}{1.055} \right)^{2.4}, & \text{if } C > 0.04045
\end{cases}$$

### Step 2: Linear sRGB to Cone Photoreceptor LMS Response
The linearized coordinates are projected into the human LMS cone response space via matrix $\mathbf{M}_1$:
$$\text{Eq. 30b:} \quad \begin{bmatrix} l \\ m \\ s \end{bmatrix} = \mathbf{M}_1 \begin{bmatrix} R_{\text{lin}} \\ G_{\text{lin}} \\ B_{\text{lin}} \end{bmatrix} = \begin{bmatrix}
0.4122214708 & 0.5363325363 & 0.0514459929 \\
0.2119034982 & 0.6806995451 & 0.1073969566 \\
0.0883024619 & 0.2817188376 & 0.6299787005
\end{bmatrix} \begin{bmatrix} R_{\text{lin}} \\ G_{\text{lin}} \\ B_{\text{lin}} \end{bmatrix}$$

### Step 3: Non-Linear LMS Cube Root Compression
The cone response signals are compressed non-linearly to model biological neural firing:
$$\text{Eq. 30c:} \quad l' = \sqrt[3]{l}, \quad m' = \sqrt[3]{m}, \quad s' = \sqrt[3]{s}$$

### Step 4: Compressed LMS to Cartesian Oklab $(L, a, b)$
The signals are transformed into perceived lightness $L$ and chromatic opponent axes $a$ (green-red) and $b$ (blue-yellow) via matrix $\mathbf{M}_2$:
$$\text{Eq. 30d:} \quad \begin{bmatrix} L \\ a \\ b \end{bmatrix} = \mathbf{M}_2 \begin{bmatrix} l' \\ m' \\ s' \end{bmatrix} = \begin{bmatrix}
0.2104542553 & 0.7936177850 & -0.0040720468 \\
1.9779984951 & -2.4285922050 & 0.4505937099 \\
0.0259040371 & 0.7827717662 & -0.8086757660
\end{bmatrix} \begin{bmatrix} l' \\ m' \\ s' \end{bmatrix}$$

### Step 5: Cartesian Oklab to Cylindrical OKLCH $(L, C, h)$
$$\text{Eq. 30e:} \quad \begin{cases}
L = L \\[4pt]
C = \sqrt{a^2 + b^2} \\[4pt]
h = \text{atan2}(b, a) \cdot \dfrac{180}{\pi} \pmod{360}
\end{cases}$$
where if $h < 0$, $h = h + 360^\circ$.

---

## 3. Inverse Transformation: $\text{OKLCH} \to s\text{RGB}$

Given cylindrical OKLCH coordinates $L \in [0, 1]$, $C \ge 0$, $h \in [0, 360)$:

### Step 1: Cylindrical OKLCH to Cartesian Oklab
$$\text{Eq. 31a:} \quad \begin{cases}
a = C \cdot \cos\left( h \cdot \dfrac{\pi}{180} \right) \\[6pt]
b = C \cdot \sin\left( h \cdot \dfrac{\pi}{180} \right)
\end{cases}$$

### Step 2: Oklab to Compressed LMS via Inverted Matrix $\mathbf{M}_2^{-1}$
$$\text{Eq. 31b:} \quad \begin{bmatrix} l' \\ m' \\ s' \end{bmatrix} = \mathbf{M}_2^{-1} \begin{bmatrix} L \\ a \\ b \end{bmatrix} = \begin{bmatrix}
1.0 & +0.3963377774 & +0.2158037573 \\
1.0 & -0.1055613458 & -0.0638541728 \\
1.0 & -0.0894841775 & -1.2914855480
\end{bmatrix} \begin{bmatrix} L \\ a \\ b \end{bmatrix}$$

### Step 3: LMS Cubic Decompression
$$\text{Eq. 31c:} \quad l = (l')^3, \quad m = (m')^3, \quad s = (s')^3$$

### Step 4: Linear LMS to Linear sRGB via Inverted Matrix $\mathbf{M}_1^{-1}$
$$\text{Eq. 31d:} \quad \begin{bmatrix} R_{\text{lin}} \\ G_{\text{lin}} \\ B_{\text{lin}} \end{bmatrix} = \mathbf{M}_1^{-1} \begin{bmatrix} l \\ m \\ s \end{bmatrix} = \begin{bmatrix}
+4.0767416621 & -3.3077115913 & +0.2309699292 \\
-1.2684380046 & +2.6097574011 & -0.3413193965 \\
-0.0041960863 & -0.7034186147 & +1.7076147010
\end{bmatrix} \begin{bmatrix} l \\ m \\ s \end{bmatrix}$$

### Step 5: Gamma Encoding & Gamut Clamping
For each channel $C_{\text{lin}} \in \{R_{\text{lin}}, G_{\text{lin}}, B_{\text{lin}}\}$:
$$\text{Eq. 31e:} \quad C = \begin{cases}
12.92 \cdot C_{\text{lin}}, & \text{if } C_{\text{lin}} \le 0.0031308 \\[8pt]
1.055 \cdot (C_{\text{lin}})^{1/2.4} - 0.055, & \text{if } C_{\text{lin}} > 0.0031308
\end{cases}$$
The final 8-bit integer is clamped to $[0, 255]$:
$$C_{\text{byte}} = \text{round}\left( \max(0, \min(1, C)) \cdot 255 \right)$$

---

## 4. Semantic Role Classification Algorithm

Every color extracted from reference or client palettes is classified into a strict semantic hierarchy based on lightness and chroma quantiles:

```
Algorithm: Semantic Role Classification
Input: Palette P = {c_1, ..., c_n} in OKLCH, Mode in {dark, light}
Output: Map of Semantic Roles R -> OKLCH color

1. Sort P by Lightness L ascending: P_sorted = [c_(1), c_(2), ..., c_(n)]
2. If Mode == dark:
     R['bg']             := argmin_{c in P} L(c)  with constraint C(c) <= 0.03
     R['surface']        := color c with L(c) in [L(bg) + 0.04, L(bg) + 0.08], C(c) <= 0.03
     R['surface-raised'] := color c with L(c) in [L(surface) + 0.04, L(surface) + 0.08]
     R['border']         := color c with L(c) in [L(surface) + 0.08, L(surface) + 0.16], C(c) <= 0.02
     R['fg-dim']         := color c with L(c) in [0.55, 0.70], C(c) <= 0.04
     R['fg']             := argmax_{c in P} L(c)  with constraint C(c) <= 0.04 (typically L >= 0.90)
     R['accent']         := argmax_{c in P} C(c)  (highest chroma, e.g. C >= 0.12)
3. If Mode == light:
     Invert lightness intervals symmetrically around L = 0.50.
4. Return R
```

---

## 5. Relational Palette Projection

When a client provides a brand primary color $C_{\text{brand}} = (L_b, C_b, h_b)$, the engine preserves the original spatial depth of the reference design by projecting the client hue $h_b$ while maintaining the exact lightness deltas $\Delta L_i = L_{\text{ref}, i} - L_{\text{ref}, \text{bg}}$:

### CSS Custom Properties Emitted:
```css
:root {
  --color-bg: oklch(0.12 0.01 240);
  --color-surface: oklch(0.18 0.015 240);
  --color-surface-raised: oklch(0.24 0.02 240);
  --color-border: oklch(0.28 0.01 240 / 0.15);
  --color-fg: oklch(0.96 0.01 240);
  --color-fg-dim: oklch(0.72 0.02 240);
  --color-accent: oklch(0.68 0.22 35);
}
```

### Shader Uniforms Emitted (Linear $s\text{RGB}$ `vec3` for WebGL):
```glsl
uniform vec3 u_backdropColor; // e.g. vec3(0.012, 0.014, 0.018)
uniform vec3 u_accentColor;   // e.g. vec3(0.98, 0.22, 0.15)
```

---

## 6. Verification Strategy

1. **Roundtrip Accuracy Test:** `test/v2.6/apca-contrast.test.js` tests roundtrip conversion ($s\text{RGB} \to \text{OKLCH} \to s\text{RGB}$) across 1,000 random RGB inputs, asserting maximum error $\Delta E \le 10^{-4}$.
2. **Boundary Gamut Test:** Validates out-of-gamut colors ($C > 0.35$) correctly clamp without producing NaN or channel wrap-around.
3. **Palette Projection Audit:** Verifies that client theme transmutations maintain exact $\Delta L_i$ deltas across dark and light palettes.
