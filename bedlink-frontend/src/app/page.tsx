import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { FreshnessIndicator } from "@/components/status/FreshnessIndicator";
import { ConnectionStatus } from "@/components/status/ConnectionStatus";
import { SyncIndicator } from "@/components/status/SyncIndicator";
import { ETAIndicator } from "@/components/status/ETAIndicator";
import { MatchScore } from "@/components/status/MatchScore";
import { HospitalCard } from "@/components/hospital/HospitalCard";
import { HospitalMatchCard } from "@/components/hospital/HospitalMatchCard";
import { EmergencyCard } from "@/components/emergency/EmergencyCard";
import { MapPanel } from "@/components/map/MapPanel";
import { HospitalMarker } from "@/components/map/HospitalMarker";
import { RequirementSelector } from "@/components/filters/RequirementSelector";
import {
  Stethoscope,
  MapPin,
  Users,
  Activity,
  AlertTriangle,
  Wifi,
  WifiOff,
  CheckCircle,
  Clock,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Mock data for the dashboard showcase
const activeEmergencies = [
  {
    id: "BL-1042",
    code: "BL-1042",
    severity: "critical" as const,
    title: "Cardiac Arrest",
    etaMinutes: 8,
    required: ["ICU", "Ventilator", "Cardiac"],
    freshness: "live" as const,
    freshnessTimestamp: "24 sec ago",
    matchScore: 94,
    offerState: "sent" as const,
  },
  {
    id: "BL-1041",
    code: "BL-1041",
    severity: "urgent" as const,
    title: "Severe Trauma",
    etaMinutes: 14,
    required: ["ICU", "Trauma"],
    freshness: "recent" as const,
    freshnessTimestamp: "3 min ago",
    matchScore: 87,
    offerState: "accepted" as const,
  },
  {
    id: "BL-1039",
    code: "BL-1039",
    severity: "critical" as const,
    title: "Severe Burns",
    etaMinutes: 19,
    required: ["ICU", "Specialist"],
    freshness: "aging" as const,
    freshnessTimestamp: "8 min ago",
    matchScore: 82,
    offerState: "timeout" as const,
  },
];

const hospitals = [
  {
    name: "CityCare Emergency Centre",
    location: "42.3601° N, 71.0589° W",
    freshness: "live" as const,
    timestamp: "31 sec ago",
    emergencyLoad: "moderate" as const,
    icuLoad: 62,
    services: ["Cardiac", "Trauma", "Neuro"],
    availableResources: { ICU: 3, Ventilator: 2, Oxygen: 8 },
    onlineStatus: "online" as const,
    onClick: () => {},
  },
  {
    name: "Riverside General Hospital",
    location: "42.3518° N, 71.0573° W",
    freshness: "recent" as const,
    timestamp: "2 min ago",
    emergencyLoad: "high" as const,
    icuLoad: 85,
    services: ["Trauma", "Burns", "Pediatric"],
    availableResources: { ICU: 1, Ventilator: 0, Oxygen: 4 },
    onlineStatus: "online" as const,
    onClick: () => {},
  },
  {
    name: "Northside Medical Centre",
    location: "42.3714° N, 71.0598° W",
    freshness: "aging" as const,
    timestamp: "7 min ago",
    emergencyLoad: "moderate" as const,
    icuLoad: 45,
    services: ["Cardiac", "Neuro"],
    availableResources: { ICU: 4, Ventilator: 3, Oxygen: 12 },
    onlineStatus: "degraded" as const,
    onClick: () => {},
  },
];

const matches = [
  {
    name: "CityCare Emergency Centre",
    score: 94,
    reason: "Top match for this emergency",
    reasons: ["ICU available", "Ventilator available", "Cardiac capability", "Updated 31 sec ago", "8 min ETA", "Moderate emergency load"],
    distance: 3.2,
    eta: 8,
    required: ["ICU", "Ventilator", "Cardiac"],
    available: { ICU: 3, Ventilator: 2, Oxygen: 8 },
    specialties: ["Cardiac", "Trauma", "Neuro"],
    freshness: "live" as const,
    freshnessTimestamp: "31 sec ago",
    load: "moderate" as const,
    state: "available" as const,
    offerState: "sent" as const,
    holdState: "none" as const,
    isBeingOffered: false,
    primaryActionLabel: "Request Confirmation",
    onPrimaryAction: () => {},
  },
  {
    name: "Riverside General Hospital",
    score: 78,
    reason: "Partial match",
    reasons: ["ICU available", "Ventilator unavailable", "Trauma capability", "Updated 2 min ago", "15 min ETA", "High emergency load"],
    distance: 5.8,
    eta: 15,
    required: ["ICU", "Ventilator"],
    available: { ICU: 1, Ventilator: 0, Oxygen: 4 },
    specialties: ["Trauma", "Burns"],
    freshness: "recent" as const,
    freshnessTimestamp: "2 min ago",
    load: "high" as const,
    state: "available" as const,
    offerState: "none" as const,
    holdState: "none" as const,
    isBeingOffered: false,
    primaryActionLabel: "Request Confirmation",
    onPrimaryAction: () => {},
  },
];

const requirements = [
  { id: "icu", label: "ICU" },
  { id: "ventilator", label: "Ventilator" },
  { id: "cardiac", label: "Cardiac" },
  { id: "trauma", label: "Trauma" },
  { id: "burns", label: "Burns" },
  { id: "neuro", label: "Neuro" },
  { id: "nicu", label: "NICU" },
  { id: "oxygen", label: "Oxygen" },
  { id: "isolation", label: "Isolation" },
  { id: "pediatric", label: "Pediatric" },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <Stethoscope className={styles.logoIcon} aria-hidden="true" />
            <span className={styles.logoText}>BedLink</span>
          </div>
          <h1 className={styles.pageTitle}>Emergency Operations</h1>
          <p className={styles.pageSubtitle}>
            Real-time hospital resource coordination — see what's happening now
          </p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.identity}>
            <MapPin className={styles.identityIcon} aria-hidden="true" />
            <span className={styles.identityText}>BedLink Coordination</span>
          </div>
          <ConnectionStatus state="online" lastSynced="18 sec ago" />
          <SyncIndicator state="synced" message="31 sec ago" />
        </div>
      </div>

      <div className={styles.statusBar}>
        <div className={styles.statusItem}>
          <Wifi className={styles.statusIcon} aria-hidden="true" />
          <span className={styles.statusLabel}>Network</span>
          <StatusBadge status="available">ONLINE</StatusBadge>
        </div>
        <div className={styles.statusItem}>
          <CheckCircle className={styles.statusIcon} aria-hidden="true" />
          <span className={styles.statusLabel}>Active Emergencies</span>
          <StatusBadge status="unavailable">3</StatusBadge>
        </div>
        <div className={styles.statusItem}>
          <Activity className={styles.statusIcon} aria-hidden="true" />
          <span className={styles.statusLabel}>Live Map</span>
          <StatusBadge status="held">ACTIVE</StatusBadge>
        </div>
        <div className={styles.statusItem}>
          <AlertTriangle className={styles.statusIcon} aria-hidden="true" />
          <span className={styles.statusLabel}>Alerts</span>
          <StatusBadge status="pending">1 pending</StatusBadge>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.col}>
          {/* Primary Column */}
          <div className={styles.colPrimary}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Active Emergencies</h2>
                <Button variant="ghost" size="sm">
                  View all
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                </Button>
              </div>
              <div className={styles.cardBody}>
                {activeEmergencies.map((emergency) => (
                  <EmergencyCard
                    key={emergency.id}
                    id={emergency.id}
                    code={emergency.code}
                    severity={emergency.severity}
                    title={emergency.title}
                    etaMinutes={emergency.etaMinutes}
                    required={emergency.required}
                    freshness={emergency.freshness}
                    freshnessTimestamp={emergency.freshnessTimestamp}
                    matchScore={emergency.matchScore}
                    offerState={emergency.offerState}
                  />
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Live Operational Map</h2>
              </div>
              <div className={styles.cardBody}>
                <MapPanel>
                  <HospitalMarker name="CityCare" id="m1" load="moderate" freshness="live" freshnessTimestamp="31 sec ago" />
                  <HospitalMarker name="Riverside" id="m2" load="high" freshness="recent" freshnessTimestamp="2 min ago" />
                  <HospitalMarker name="Northside" id="m3" load="moderate" freshness="aging" freshnessTimestamp="7 min ago" />
                </MapPanel>
              </div>
            </div>
          </div>

          {/* Secondary Column */}
          <div className={styles.colSecondary}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Matching</h2>
              </div>
              <div className={styles.cardBody}>
                {matches.map((match) => (
                  <HospitalMatchCard
                    key={match.name}
                    name={match.name}
                    score={match.score}
                    reason={match.reason}
                    reasons={match.reasons}
                    distance={match.distance}
                    eta={match.eta}
                    required={match.required}
                    available={match.available}
                    specialties={match.specialties}
                    freshness={match.freshness}
                    freshnessTimestamp={match.freshnessTimestamp}
                    load={match.load}
                    state={match.state}
                    offerState={match.offerState}
                    holdState={match.holdState}
                    isBeingOffered={match.isBeingOffered}
                    primaryActionLabel={match.primaryActionLabel}
                    onPrimaryAction={match.onPrimaryAction}
                  />
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Hospitals (3)</h2>
              </div>
              <div className={styles.cardBody}>
                {hospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital.name}
                    name={hospital.name}
                    location={hospital.location}
                    freshness={hospital.freshness}
                    timestamp={hospital.timestamp}
                    emergencyLoad={hospital.emergencyLoad}
                    icuLoad={hospital.icuLoad}
                    services={hospital.services}
                    availableResources={hospital.availableResources}
                    onlineStatus={hospital.onlineStatus}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>New Emergency</h2>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.newEmergencyForm}>
                  <div className={styles.formGroup}>
                    <label className="text-xs font-medium text-text-secondary">Condition</label>
                    <select className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary transition-colors focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20">
                      <option>Critical</option>
                      <option>Urgent</option>
                      <option>Stable</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className="text-xs font-medium text-text-secondary">Required Care</label>
                    <div className={styles.requirementSelector}>
                      <RequirementSelector
                        options={requirements}
                        selected={[]}
                        onChange={() => {}}
                        header="Care required"
                        showAll={false}
                      />
                    </div>
                  </div>
                  <Button variant="primary" className="w-full">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    Find Matching Hospitals
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.colWide}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Emergency Detail — BL-1042</h2>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <span className="text-xs font-semibold text-text-secondary">Code</span>
                  <span className="text-sm font-mono text-text-primary">BL-1042</span>
                </div>
                <div className={styles.detailItem}>
                  <span className="text-xs font-semibold text-text-secondary">Condition</span>
                  <StatusBadge status="unavailable">CRITICAL</StatusBadge>
                </div>
                <div className={styles.detailItem}>
                  <span className="text-xs font-semibold text-text-secondary">ETA</span>
                  <ETAIndicator minutes={8} distance={3.2} showRoute />
                </div>
                <div className={styles.detailItem}>
                  <span className="text-xs font-semibold text-text-secondary">Data Freshness</span>
                  <FreshnessIndicator status="live" timestamp="24 sec ago" showLabel />
                </div>
                <div className={styles.detailItem}>
                  <span className="text-xs font-semibold text-text-secondary">Ambulance ETA</span>
                  <ETAIndicator minutes={8} showRoute />
                </div>
                <div className={styles.detailItem}>
                  <span className="text-xs font-semibold text-text-secondary">Match Score</span>
                  <MatchScore value={94} size="sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
