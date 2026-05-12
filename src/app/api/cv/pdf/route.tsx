import { NextResponse } from "next/server";
import {
  Document,
  Font,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import { cv } from "@/data/cv";
import { profile } from "@/data/profile";
import React from "react";
import path from "path";

export const runtime = "nodejs";

// Türkçe karakter desteği için Inter (latin-ext) — ç, ş, ğ, ı, İ, ö, ü dahil
Font.register({
  family: "Inter",
  fonts: [
    {
      src: path.join(process.cwd(), "public/fonts/Inter-Regular.ttf"),
      fontWeight: 400,
    },
    {
      src: path.join(process.cwd(), "public/fonts/Inter-Bold.ttf"),
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Inter",
    color: "#1f2937",
    lineHeight: 1.5,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#15803d",
    paddingBottom: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    color: "#0a0e1a",
  },
  title: {
    fontSize: 11,
    color: "#475569",
    marginTop: 4,
  },
  meta: {
    fontSize: 9,
    color: "#64748b",
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 9,
    color: "#15803d",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 18,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#475569",
  },
  entry: {
    marginBottom: 10,
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#0a0e1a",
  },
  entryOrg: {
    fontSize: 10,
    color: "#475569",
    marginTop: 2,
  },
  entryDate: {
    fontSize: 9,
    color: "#64748b",
  },
  entryDesc: {
    fontSize: 9,
    color: "#475569",
    marginTop: 4,
    lineHeight: 1.5,
  },
  skillCategory: {
    fontSize: 9,
    fontWeight: 700,
    color: "#0a0e1a",
    marginBottom: 2,
  },
  skillItems: {
    fontSize: 9,
    color: "#475569",
    marginBottom: 6,
  },
  twoCol: {
    flexDirection: "row",
    gap: 20,
  },
  col: {
    flex: 1,
  },
});

function CVDocument() {
  return (
    <Document title={`${profile.name} — CV`} author={profile.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.title}>{profile.title}</Text>
          <Text style={styles.meta}>
            {profile.email} · {profile.location} · {profile.website.replace("https://", "")}
          </Text>
        </View>

        <Text style={styles.summary}>{cv.summary}</Text>

        <Text style={styles.sectionTitle}>Araştırma Alanları</Text>
        {cv.research.map((r, i) => (
          <Text key={i} style={styles.skillItems}>
            • {r}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Deneyim</Text>
        {cv.experience.map((e, i) => (
          <View key={i} style={styles.entry}>
            <View style={styles.entryRow}>
              <View>
                <Text style={styles.entryTitle}>{e.title}</Text>
                <Text style={styles.entryOrg}>
                  {e.org}
                  {e.location ? ` · ${e.location}` : ""}
                </Text>
              </View>
              <Text style={styles.entryDate}>
                {e.start} – {e.end}
              </Text>
            </View>
            {e.description && (
              <Text style={styles.entryDesc}>{e.description}</Text>
            )}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Eğitim</Text>
        {cv.education.map((e, i) => (
          <View key={i} style={styles.entry}>
            <View style={styles.entryRow}>
              <View>
                <Text style={styles.entryTitle}>{e.title}</Text>
                <Text style={styles.entryOrg}>
                  {e.org}
                  {e.location ? ` · ${e.location}` : ""}
                </Text>
              </View>
              <Text style={styles.entryDate}>
                {e.start} – {e.end}
              </Text>
            </View>
            {e.description && (
              <Text style={styles.entryDesc}>{e.description}</Text>
            )}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Yayınlar</Text>
        {cv.publications.map((p, i) => (
          <View key={i} style={styles.entry}>
            <View style={styles.entryRow}>
              <Text style={[styles.entryTitle, { flex: 1, paddingRight: 12 }]}>
                {p.title}
              </Text>
              <Text style={styles.entryDate}>{p.year}</Text>
            </View>
            <Text style={styles.entryDesc}>{p.venue}</Text>
          </View>
        ))}

        {cv.awards.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Ödüller</Text>
            {cv.awards.map((a, i) => (
              <View key={i} style={styles.entry}>
                <Text style={styles.entryTitle}>{a.title}</Text>
                <Text style={styles.entryOrg}>
                  {a.org} · {a.year}
                </Text>
              </View>
            ))}
          </>
        )}

        <Text style={styles.sectionTitle}>Yetenekler</Text>
        {cv.skills.map((s) => (
          <View key={s.category}>
            <Text style={styles.skillCategory}>{s.category}</Text>
            <Text style={styles.skillItems}>{s.items.join(" · ")}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Diller</Text>
        {cv.languages.map((l) => (
          <Text key={l.name} style={styles.skillItems}>
            {l.name} — {l.level}
          </Text>
        ))}
      </Page>
    </Document>
  );
}

export async function GET() {
  try {
    const buffer = await renderToBuffer(<CVDocument />);
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="osmancancetlenbik-cv.pdf"',
      },
    });
  } catch (e) {
    console.error("PDF generation error", e);
    return NextResponse.json(
      { error: "PDF oluşturulamadı" },
      { status: 500 }
    );
  }
}
