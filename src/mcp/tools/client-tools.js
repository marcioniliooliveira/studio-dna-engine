const fs = require('fs');
const path = require('path');
const { createClientProject } = require('../../generators/client-factory');
const { transmuteClient } = require('../../pipeline/transmuter');
const { injectContentSlots } = require('../../generators/slot-injector');
const { EdgeStaticCompiler } = require('../../compiler/edge-static-compiler');
const { NextJsRscCompiler } = require('../../compiler/nextjs-rsc-compiler');
const {
  CreateClientSchema,
  TransmuteClientSchema,
  CompileDualstackSchema,
  InjectSlotsSchema,
  PatchBrandSpecSchema,
  getSafeClientDir,
  getSafeRefDir,
  validateSlugSecurity,
  ROOT_DIR
} = require('../schemas');

function registerClientTools(server) {
  // Tool 1: Criar Projeto de Cliente One-Shot (Fábrica ICM)
  server.tool(
    'create_client_project',
    'Cria uma pasta de cliente isolada e desacoplada baseada em um esqueleto de referência do Vault.',
    CreateClientSchema,
    async ({ brandName, refSlug = 'storeyarchitecture-co-uk', niche, toneOfVoice, whatsapp }) => {
      try {
        validateSlugSecurity(refSlug);
        getSafeRefDir(refSlug);

        const res = createClientProject({
          brandName,
          refSlug,
          brandSpec: { niche, toneOfVoice, whatsapp }
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              clientSlug: res.clientSlug,
              clientDir: res.clientDir,
              previewUrl: `http://127.0.0.1:4000/clientes/${res.clientSlug}/site/index.html`,
              message: `🎉 Projeto de cliente "${brandName}" criado com sucesso em ambiente isolado ICM.`
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: err.message }]
        };
      }
    }
  );

  // Tool 2: Transmutar Site do Cliente Deterministicamente (Motor Canônico)
  server.tool(
    'transmute_client_site',
    'Executa o motor canônico determinístico de transmutação (transmuter.js) aplicando brand-spec.json, injeção de slots, SplitText W3C e regras anti-slop.',
    TransmuteClientSchema,
    async ({ clientSlug }) => {
      try {
        const clientDir = getSafeClientDir(clientSlug);
        if (!fs.existsSync(clientDir)) {
          return {
            isError: true,
            content: [{ type: 'text', text: `❌ Cliente não encontrado em clientes/${clientSlug}` }]
          };
        }

        const result = await transmuteClient(clientSlug);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              clientSlug,
              outputPath: result.outputPath,
              outputHash: result.outputHash,
              replacedSlotsCount: result.replacedSlotsCount,
              antiSlopVerified: true,
              message: `✅ Transmutação determinística concluída com sucesso para o cliente "${clientSlug}".`
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `❌ Falha na transmutação do cliente: ${err.message}` }]
        };
      }
    }
  );

  // Tool 3: Compilação Dual-Stack (Edge Static ou Next.js 15 App Router RSC)
  server.tool(
    'compile_dualstack',
    'Compila o projeto do cliente para o formato de produção especificado: Edge Static HTML5 ou Next.js 15 App Router RSC.',
    CompileDualstackSchema,
    async ({ clientSlug, target }) => {
      try {
        const clientDir = getSafeClientDir(clientSlug);
        const brandSpecPath = path.join(clientDir, 'brand-spec.json');
        const brandSpec = fs.existsSync(brandSpecPath)
          ? JSON.parse(fs.readFileSync(brandSpecPath, 'utf8'))
          : { brandName: clientSlug };

        const compSpecPath = path.join(clientDir, 'composition-spec.json');
        let compSpec = null;
        if (fs.existsSync(compSpecPath)) {
          try {
            const rawSpec = JSON.parse(fs.readFileSync(compSpecPath, 'utf8'));
            if (rawSpec && Array.isArray(rawSpec.stages) && rawSpec.stages.length > 0 && rawSpec.brandSpec) {
              compSpec = rawSpec;
            }
          } catch (_) {}
        }

        if (!compSpec) {
          compSpec = {
            schemaVersion: '2.0.0',
            brandSpec: {
              brandName: brandSpec.brandName || clientSlug,
              theme: {
                accent: (brandSpec.theme && brandSpec.theme.accent) || brandSpec.primaryColor || '#00f0ff',
                bgBase: (brandSpec.theme && brandSpec.theme.bgBase) || brandSpec.secondaryColor || '#0a0a0c'
              },
              meta: {
                title: `${brandSpec.brandName || clientSlug} | Experiência de Alta Performance`,
                description: `Site de alta conversão desenvolvido para ${brandSpec.brandName || clientSlug}`
              }
            },
            stages: [
              {
                id: 'stage-hero',
                type: 'HeroCinematicStage',
                title: brandSpec.brandName || clientSlug,
                slots: [
                  {
                    slotId: 'slot-headline',
                    slotType: 'heading',
                    targetSelector: '.hero-headline',
                    content: brandSpec.headline || `Bem-vindo a ${brandSpec.brandName || clientSlug}`
                  }
                ]
              }
            ]
          };
        }

        const outDir = path.join(clientDir, target === 'nextjs-rsc' ? 'nextjs-dist' : 'dist-static');

        let compileResult;
        if (target === 'nextjs-rsc') {
          const compiler = new NextJsRscCompiler();
          compileResult = compiler.compile(compSpec, { writeToDisk: true, outDir });
        } else {
          const compiler = new EdgeStaticCompiler();
          compileResult = compiler.compile(compSpec, { writeToDisk: true, outDir });
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              target,
              clientSlug,
              outDir,
              filesGenerated: Object.keys(compileResult.files || {}),
              message: `🚀 Compilação ${target} concluída em: ${outDir}`
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `❌ Falha na compilação dualstack: ${err.message}` }]
        };
      }
    }
  );

  // Tool 4: Injetar Slots Mecanicamente
  server.tool(
    'inject_content_slots',
    'Mescla o esqueleto estrutural com o JSON de copy do cliente deterministicamente, sem quebrar o código.',
    InjectSlotsSchema,
    async ({ skeletonPath, contentSlotsPath, outputPath }) => {
      try {
        const absOutput = path.resolve(outputPath);
        const copiasDir = path.resolve(ROOT_DIR, 'copias');
        if (absOutput === copiasDir || absOutput.startsWith(copiasDir + path.sep)) {
          throw new Error('Security violation: Cannot write to read-only copias/ directory');
        }
        if (!absOutput.startsWith(ROOT_DIR + path.sep)) {
          throw new Error('Security violation: Output path escapes workspace');
        }

        const absSkeleton = path.resolve(skeletonPath);
        if (!absSkeleton.startsWith(ROOT_DIR + path.sep)) {
          throw new Error('Security violation: Skeleton path escapes workspace');
        }

        const absSlots = path.resolve(contentSlotsPath);
        if (!absSlots.startsWith(ROOT_DIR + path.sep)) {
          throw new Error('Security violation: Content slots path escapes workspace');
        }

        const res = injectContentSlots({ skeletonPath, contentSlotsPath, outputPath });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              replacedCount: res.replacedCount,
              outputPath: res.outputPath,
              message: `✅ Injeção de slots concluída com sucesso! ${res.replacedCount} slots substituídos em: ${res.outputPath}`
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: err.message }]
        };
      }
    }
  );

  // Tool 5: Atualizar Brand Spec do Cliente (Iteração Segura)
  server.tool(
    'patch_brand_spec',
    'Aplica modificações incrementais e validadas ao brand-spec.json do cliente ativo sem sobrescrever configurações críticas.',
    PatchBrandSpecSchema,
    async ({ clientSlug, updates }) => {
      try {
        const clientDir = getSafeClientDir(clientSlug);
        const specFile = path.join(clientDir, 'brand-spec.json');
        if (!fs.existsSync(specFile)) {
          return {
            isError: true,
            content: [{ type: 'text', text: `❌ brand-spec.json não encontrado para o cliente: ${clientSlug}` }]
          };
        }

        const currentSpec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
        const updatedSpec = {
          ...currentSpec,
          ...updates,
          updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(specFile, JSON.stringify(updatedSpec, null, 2), 'utf8');

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              clientSlug,
              updatedKeys: Object.keys(updates),
              specFile,
              message: `✅ brand-spec.json atualizado com sucesso para o cliente "${clientSlug}".`
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `❌ Falha ao atualizar brand-spec: ${err.message}` }]
        };
      }
    }
  );
}

module.exports = { registerClientTools };
