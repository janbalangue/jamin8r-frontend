import { useMemo, useState } from "react";
import {
  Appearance,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Jamin8rApiClient, Jamin8rApiError } from "@jamin8r/api-client";
import { palette } from "@jamin8r/design";
import type { ThemeName } from "@jamin8r/design";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export default function App() {
  const systemTheme: ThemeName =
    Appearance.getColorScheme() === "dark" ? "dark" : "light";
  const [theme, setTheme] = useState<ThemeName>(systemTheme);
  const colors = palette[theme];
  const styles = useMemo(() => createStyles(colors), [colors]);
  const api = useMemo(
    () => new Jamin8rApiClient({ baseUrl: API_BASE_URL }),
    [],
  );
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function createProfile() {
    setBusy(true);
    setStatus("");
    try {
      const user = await api.registerUser({ username: username.trim() });
      await api.upsertProfile(user.id, { displayName: displayName.trim() });
      setStatus(`Created @${user.username}`);
    } catch (error) {
      setStatus(
        error instanceof Jamin8rApiError
          ? error.message
          : `Could not reach ${API_BASE_URL}`,
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.topbar}>
          <View style={styles.brandRow}>
            <View style={styles.brandGrid}>
              <View
                style={[styles.brandCell, { backgroundColor: colors.red }]}
              />
              <View
                style={[styles.brandCell, { backgroundColor: colors.surface }]}
              />
              <View
                style={[styles.brandCell, { backgroundColor: colors.blue }]}
              />
              <View
                style={[styles.brandCell, { backgroundColor: colors.yellow }]}
              />
            </View>
            <Text style={styles.brand}>jamin8r</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => setTheme(theme === "light" ? "dark" : "light")}
            style={styles.themeButton}
          >
            <Text style={styles.themeText}>
              {theme === "light" ? "◐ Dark" : "◑ Light"}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.eyebrow}>THE SOCIAL WEB, WITH A POINT OF VIEW</Text>
        <Text style={styles.hero}>Your page should feel like you.</Text>
        <Text style={styles.lede}>
          Music, identity, and people worth discovering—without turning everyone
          into the same template.
        </Text>

        <View style={styles.composition}>
          <View
            style={[styles.geo, { backgroundColor: colors.red, flex: 1.2 }]}
          />
          <View
            style={[styles.geo, { backgroundColor: colors.surface, flex: 0.7 }]}
          />
          <View
            style={[styles.geo, { backgroundColor: colors.blue, flex: 1 }]}
          />
          <View
            style={[styles.geo, { backgroundColor: colors.yellow, flex: 0.5 }]}
          />
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.eyebrow}>FOUNDING PROFILE</Text>
          <Text style={styles.name}>Jay</Text>
          <Text style={styles.muted}>@jay · Los Angeles</Text>
          <Text style={styles.bio}>
            Backend engineer, pianist, and collector of interesting systems.
            Here for music that leaves a mark.
          </Text>
          <View style={styles.tags}>
            {["post-punk", "ambient", "sci-fi", "piano"].map((x) => (
              <View key={x} style={styles.tag}>
                <Text style={styles.tagText}>{x}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.eyebrow}>LIVE BACKEND SLICE</Text>
          <Text style={styles.sectionTitle}>Claim a profile.</Text>
          <TextInput
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            placeholder="username"
            placeholderTextColor={colors.inkMuted}
            style={styles.input}
          />
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="display name"
            placeholderTextColor={colors.inkMuted}
            style={styles.input}
          />
          <Pressable
            disabled={busy || username.trim().length < 3 || !displayName.trim()}
            onPress={createProfile}
            style={({ pressed }) => [
              styles.primary,
              pressed && { opacity: 0.8 },
              busy && { opacity: 0.55 },
            ]}
          >
            <Text style={styles.primaryText}>
              {busy ? "Creating…" : "Create profile"}
            </Text>
          </Pressable>
          {!!status && <Text style={styles.status}>{status}</Text>}
          <Text style={styles.endpoint}>API: {API_BASE_URL}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type Colors = (typeof palette)[ThemeName];
function createStyles(c: Colors) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.canvas },
    page: { padding: 20, paddingBottom: 56, gap: 18 },
    topbar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18,
    },
    brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    brandGrid: {
      width: 25,
      height: 25,
      borderWidth: 2,
      borderColor: c.line,
      backgroundColor: c.line,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 2,
      padding: 1,
    },
    brandCell: {
      width: 9,
      height: 9,
    },
    brand: {
      fontSize: 21,
      fontWeight: "800",
      color: c.ink,
      letterSpacing: -0.7,
    },
    themeButton: {
      paddingVertical: 8,
      paddingHorizontal: 11,
      borderWidth: 1,
      borderColor: c.lineSoft,
      borderRadius: 999,
      backgroundColor: c.surface,
    },
    themeText: { color: c.ink, fontWeight: "600" },
    eyebrow: {
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 1.6,
      color: c.inkMuted,
    },
    hero: {
      fontSize: 48,
      lineHeight: 49,
      fontWeight: "800",
      letterSpacing: -2.7,
      color: c.ink,
      maxWidth: 360,
    },
    lede: { fontSize: 17, lineHeight: 25, color: c.inkMuted, maxWidth: 360 },
    composition: {
      height: 150,
      flexDirection: "row",
      gap: 3,
      backgroundColor: c.line,
      borderWidth: 3,
      borderColor: c.line,
      marginVertical: 12,
    },
    geo: { height: "100%" },
    profileCard: {
      padding: 22,
      borderWidth: 1,
      borderColor: c.lineSoft,
      backgroundColor: c.surface,
      gap: 8,
    },
    name: {
      fontSize: 34,
      fontWeight: "800",
      letterSpacing: -1.4,
      color: c.ink,
    },
    muted: { color: c.inkMuted },
    bio: { fontSize: 16, lineHeight: 23, color: c.ink, marginVertical: 10 },
    tags: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
    tag: {
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: c.lineSoft,
      backgroundColor: c.surfaceRaised,
    },
    tagText: { fontSize: 12, color: c.ink },
    formCard: {
      padding: 22,
      borderWidth: 1,
      borderColor: c.lineSoft,
      backgroundColor: c.surface,
      gap: 12,
    },
    sectionTitle: {
      fontSize: 30,
      fontWeight: "800",
      letterSpacing: -1.2,
      color: c.ink,
      marginBottom: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: c.lineSoft,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      color: c.ink,
      backgroundColor: c.surfaceRaised,
    },
    primary: {
      alignSelf: "flex-start",
      backgroundColor: c.ink,
      borderRadius: 9,
      paddingHorizontal: 17,
      paddingVertical: 12,
      marginTop: 2,
    },
    primaryText: { color: c.canvas, fontWeight: "800" },
    status: {
      color: c.ink,
      borderLeftWidth: 3,
      borderLeftColor: c.blue,
      paddingLeft: 10,
      marginTop: 4,
    },
    endpoint: { fontSize: 11, color: c.inkMuted, marginTop: 5 },
  });
}
