# OpsCommander 🛡️

**OpsCommander** is an enterprise-grade Site Reliability Engineering (SRE) Incident Management Platform designed to streamline incident response, coordination, and observability. It provides a unified command center for engineering teams to detect, manage, and resolve production issues efficiently.

## 🚀 Features

### 📊 Observability Dashboard
- **Real-time Metrics**: Track Active Incidents, MTTR (Mean Time To Recovery), MTTD (Mean Time To Detection), and System Health Scores.
- **Reliability Widgets**: Visualize uptime and error breakdowns across Application, Infrastructure, and Database layers.
- **Squad Analytics**: Monitor incident distribution by engineering squads and severity levels.

### 🚨 Incident Management
- **Full Lifecycle Tracking**: Manage incidents from declaration to resolution.
- **Severity Levels**: Categorize issues (SEV1 Critical to SEV3 Moderate).
- **RCA Workflows**: Built-in tools to draft Root Cause Analysis reports, documenting root causes, resolutions, and action items.

### ⚔️ War Room
- **Live Collaboration**: A dedicated environment for critical SEV1 incidents.
- **Communication**: Integrated chat interface and simulated video/screen sharing.
- **Action Playbooks**: Quick access to common remediation actions (Rollback, Flush Cache, Escalate).

### 🧩 Service Catalog & On-Call
- **Service Health**: Monitor operational status, latency, error rates, and uptime for all microservices.
- **On-Call Schedules**: Visualize team shifts, primary/secondary engineers, and rotation schedules.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Google Material Symbols
- **Architecture**: Next.js App Router Pattern (Adapted for SPA)

## 📂 Project Structure

The project follows a modern **Next.js-inspired App Router** directory structure to ensure scalability and separation of concerns:

```
├── app/                  # Feature Routes (Pages)
│   ├── dashboard/        # Dashboard View & Analytics Widgets
│   ├── incidents/        # Incident List & Creation Workflows
│   ├── war-room/         # Live Incident Command Center
│   ├── services/         # Service Catalog
│   └── on-call/          # Team Schedules
├── components/
│   ├── layout/           # Application Shell (Sidebar, Header)
│   └── ui/               # Shared Atomic Components (Buttons, Cards, Chips)
├── lib/                  # Core Infrastructure
│   ├── api-client.ts     # Centralized Data Fetching Layer (Router Pattern)
│   ├── mock-data.ts      # Static Data Generators
│   └── types.ts          # TypeScript Definitions
└── hooks/                # Custom React Hooks (Data Access)
```

## ⚡ Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm start
   ```

## 🎨 Design System

OpsCommander utilizes a dark-mode-first design system tailored for Network Operations Centers (NOCs) and low-light environments:
- **Palette**: Deep charcoal (`#111418`) and slate (`#1c232b`) backgrounds to reduce eye strain.
- **Status Indicators**: High-contrast traffic light colors (Red/Orange/Green/Blue) for immediate status recognition.
- **Typography**: **Inter** font family ensures high legibility for dense technical data.
