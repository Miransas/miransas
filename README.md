<div align="center">

# Miransas

**Software systems for the open web and the infrastructure beneath it.**

[Website](https://miransas.com) · [Projects](https://miransas.com/projects) · [GitHub](https://github.com/Miransas) · [Status](https://status.miransas.com)

</div>

## About

Miransas is a software company building high-performance web products, developer tools, and systems software.

We work across two closely connected layers: public products that people can use on the web, and focused infrastructure that makes those products reliable, fast, and maintainable. Our systems are designed with a bias toward clear interfaces, self-hosting, and long-term ownership.

Our engineering work includes Rust-based services, native macOS software, developer tooling, infrastructure products, and AI voice systems through [Miralas](https://miralas.io).

## What We Build

### Web Products

Our public web products are available at `miransas.com`, `binboi.com`, `blog.miransas.com`, and related product domains. They cover developer infrastructure, AI voice experiences, technical publishing, and practical utilities.

### Developer Tools and SDKs

Selected SDKs, APIs, and supporting tools are open source. They are published so developers can inspect the implementation, integrate against stable interfaces, and run the parts of the stack they need on their own infrastructure.

Open source availability is project-specific. Each repository contains its own license, documentation, and support expectations.

### Private Console and Operations

The Miransas and Miralas web experiences are public. The operational console, account systems, internal dashboards, model operations, and production control plane are private and closed source.

This separation lets us keep the public product surface simple while protecting customer data, operational controls, and the systems that run the platform.

## Technical Direction

- **Rust** for memory-safe, reliable systems services and performance-sensitive workloads
- **Go** for networking, agents, and infrastructure tooling
- **TypeScript and Next.js** for web products and developer-facing interfaces
- **PostgreSQL** for durable application data and job-backed workflows
- **Native macOS technologies** where a small, direct system utility is the right tool

We choose technologies according to the system being built. The goal is not a uniform stack; it is dependable software with a small operational footprint.

## Selected Projects

| Project | Description | Status |
| --- | --- | --- |
| [Binboi](https://binboi.com) | Self-hosted ngrok alternative for exposing local services through secure HTTPS tunnels | Live |
| [CourierX](https://github.com/Miransas/courierx) | Resend-compatible, self-hosted email delivery API built with Rust and Axum | In progress |
| [Miransas Chess](https://github.com/Miransas/miransas-chess) | From-scratch chess engine in Rust with bitboard move generation | In progress |
| [VS Code Uzbek](https://github.com/sardorazimov/vscode-language-pack-uz) | Uzbek language pack for Visual Studio Code | Live |
| Miransas Pulse | Native macOS menubar utility for live system metrics | Live |
| [Miransas Blog](https://blog.miransas.com) | Writing on systems programming, infrastructure, and shipping software | Live |

See the full project catalogue at [miransas.com/projects](https://miransas.com/projects).

## Open Source

Miransas is open where openness creates leverage for users and developers. Some libraries, SDKs, infrastructure components, and experiments are available in the [Miransas GitHub organization](https://github.com/Miransas).

The core product console and production operations remain closed. Open source repositories are independent projects and may have different maturity levels, roadmaps, and contribution policies.

## Contact

- Website: [miransas.com](https://miransas.com)
- Developer resources: [miransas.com/developers](https://miransas.com/developers)
- Status: [status.miransas.com](https://status.miransas.com)
- GitHub: [github.com/Miransas](https://github.com/Miransas)

## License

Individual projects use the license stated in their own repository. Unless a repository says otherwise, do not assume that Miransas product code or private platform code is open source.

<div align="center">

**Miransas — build clearly, run reliably.**

</div>
