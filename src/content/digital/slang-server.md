---
{
  "name": "Slang Server",
  "aliases": [
    "slang-server"
  ],
  "description": "SystemVerilog language server providing editor completion, rename, references and diagnostics, plus elaborated-hierarchy browsing and selected-instance types, widths and parameters. Design/filelist configuration enables full-design context and waveform-viewer navigation; it is an editing and debug interface, not a simulator or formal proof engine.",
  "scope": {
    "design": {
      "ai": false
    },
    "verification": {
      "ai": false
    }
  },
  "access": "MIT-licensed language server with VS Code, Neovim and other LSP clients. Advanced hierarchy and waveform integration require supported client/viewer configuration; full-design context requires appropriate build/filelist, includes and defines.",
  "addedAt": "2026-11-07",
  "reviewedAt": "2026-11-07",
  "sources": [
    {
      "id": "code",
      "title": "Canonical Slang Server repository",
      "url": "https://github.com/hudson-trading/slang-server",
      "purpose": "code"
    },
    {
      "id": "website",
      "title": "Official language-feature documentation",
      "url": "https://hudson-trading.github.io/slang-server/features/features/",
      "purpose": "official"
    },
    {
      "id": "readme",
      "title": "Reviewed editor integrations and implemented feature overview",
      "url": "https://github.com/hudson-trading/slang-server/blob/0541246eb1b9e4c1c986179cd9a9f1f8b5bb8b44/README.md"
    },
    {
      "id": "features",
      "title": "Reviewed completion, references, rename and diagnostic behavior",
      "url": "https://github.com/hudson-trading/slang-server/blob/0541246eb1b9e4c1c986179cd9a9f1f8b5bb8b44/docs/features/features.md"
    },
    {
      "id": "hierarchy",
      "title": "Reviewed active-instance elaboration context",
      "url": "https://github.com/hudson-trading/slang-server/blob/0541246eb1b9e4c1c986179cd9a9f1f8b5bb8b44/docs/features/hdl/hdl.md"
    },
    {
      "id": "limitations",
      "title": "Reviewed shallow-analysis and UVM limitations",
      "url": "https://github.com/hudson-trading/slang-server/blob/0541246eb1b9e4c1c986179cd9a9f1f8b5bb8b44/docs/features/limitations.md"
    },
    {
      "id": "activity",
      "title": "Complete named ports, parameters and call arguments with regressions",
      "url": "https://github.com/hudson-trading/slang-server/commit/0541246eb1b9e4c1c986179cd9a9f1f8b5bb8b44"
    },
    {
      "id": "implementation",
      "title": "Retained named-connection completion implementation",
      "url": "https://github.com/hudson-trading/slang-server/blob/0541246eb1b9e4c1c986179cd9a9f1f8b5bb8b44/src/completions/MemberCompletions.cpp"
    },
    {
      "id": "waveform-client",
      "title": "Reviewed editor and waveform integration",
      "url": "https://github.com/hudson-trading/slang-server/blob/0541246eb1b9e4c1c986179cd9a9f1f8b5bb8b44/docs/features/hdl/vscode.md"
    },
    {
      "id": "license",
      "title": "MIT license",
      "url": "https://github.com/hudson-trading/slang-server/blob/0541246eb1b9e4c1c986179cd9a9f1f8b5bb8b44/LICENSE"
    }
  ]
}
---

### Implementation and scope

Completion and rename materially support conventional Design editing. Diagnostics, references, elaborated-hierarchy inspection and source/waveform navigation support conventional Verification and debug. Active instances select concrete parameter values, dependent types, widths and generate context. This server is distinct from the slang frontend library and from a waveform viewer: it does not run simulation or formal proof. [Language features](#source-features) · [Active-instance semantics](#source-hierarchy) · [Viewer integration](#source-waveform-client).

### Selection and reviewed activity

Select for sustained editor implementation and recent substantive correctness and feature work. The November 6 main change adds named-port, parameter and call-argument completions, preserving already-bound values and handling incomplete elaboration contexts. Retained MemberCompletions/ShallowAnalysis changes and extensive completion regressions support the claim beyond documentation. The canonical main first-parent history supplies activity, not the downstream slang or viewer repositories. [Reviewed change and tests](#source-activity) · [Retained implementation](#source-implementation).

### Access and limitations

The MIT-licensed server has editor-specific clients. Correct build/filelist, includes and defines are needed for full-design elaboration; shallow analysis can miss parameter or preprocessor context, and some UVM patterns remain limited. References and rename can be expensive on large repositories. Advanced hierarchy/waveform operations depend on client and viewer configuration. No upstream editor, simulator or model experiments were run. [License](#source-license) · [Documented limits](#source-limitations) · [References/rename cost](#source-features) · [Client operations](#source-waveform-client).

### Development provenance

No development-provenance badge is assigned from generic editor tooling, project instructions or writing style. The reviewed completion operations are conventional; implementation provenance requires separate direct attribution evidence. [Reviewed implementation](#source-activity).
