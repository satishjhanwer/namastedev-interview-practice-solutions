// src/app/pages/Home.tsx
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Card, CardActionArea, CardContent, Chip, Grid,
  Stack, TextField, Typography, Box, InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllSolutions } from "../registry";

export default function Home() {
  const items = getAllSolutions();
  const [params, setParams] = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const [selected, setSelected] = useState(0);
  const nav = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const liveRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    const next = new URLSearchParams(params);
    if (q) next.set("q", q); else next.delete("q");
    setParams(next, { replace: true });
  }, [q]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) =>
      [it.title, it.slug, ...(it.meta?.tags ?? [])].join(" ").toLowerCase().includes(s)
    );
  }, [items, q]);

  useEffect(() => {
    if (!liveRef.current) return;
    liveRef.current.textContent = `Showing ${filtered.length} of ${items.length} solutions.`;
  }, [filtered.length, items.length]);

  useEffect(() => {
    if (selected >= filtered.length) setSelected(filtered.length ? filtered.length - 1 : 0);
  }, [filtered.length, selected]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelected((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); nav(`/s/${filtered[selected].slug}`); }
  };

  const chipColor = (label: string) => {
    if (/^easy$/i.test(label)) return "success";
    if (/^medium$/i.test(label)) return "warning";
    if (/^hard$/i.test(label)) return "error";
    if (/^done$/i.test(label)) return "primary";
    if (/^wip$/i.test(label)) return "secondary";
    return "default";
  };

  const onChipClick = (text: string | undefined) => {
    if(text) {
      const parts = new Set(q.split(/\s+/).filter(Boolean));
      parts.add(text.toLowerCase());
      setQ(Array.from(parts).join(" "));
    }
  };

  return (
    <Box>
      <TextField
        inputRef={inputRef}
        fullWidth
        placeholder="Search by title, slug, tag…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={onKeyDown}
        helperText="Use ↑/↓ to select, Enter to open. Click any chip to filter."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "text.secondary" }} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 1.5 }}
      />

      <p ref={liveRef} aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }} />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing <b>{filtered.length}</b> of <b>{items.length}</b> solutions.
      </Typography>

      {filtered.length === 0 ? (
        <Card sx={{ p: 2 }}>
          <Typography variant="h6">No matches for “{q}”.</Typography>
          <Typography color="text.secondary">Try simpler keywords or clear the search box.</Typography>
        </Card>
      ) : (
        // 🔹 Make rows have equal-height cards
        <Grid container spacing={2} alignItems="stretch">
          {filtered.map((it, idx) => (
            // Each grid item becomes a flex container
            <Grid key={it.slug} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,        // fill the grid item height
                  // focus ring without layout shift
                  boxShadow: idx === selected ? "0 0 0 3px rgba(11,95,255,.35)" : undefined,
                }}
              >
                <CardActionArea
                  component={RouterLink}
                  to={`/s/${it.slug}`}
                  sx={{ height: "100%", display: "flex", alignItems: "stretch" }}
                >
                  {/* Grid inside the card keeps the slug pinned to bottom */}
                  <CardContent
                    sx={{
                      display: "grid",
                      gridTemplateRows: { xs: "auto auto auto auto", md: "auto auto 1fr auto" },
                      gap: 1,
                      width: "100%",
                      minHeight: { md: 190 } // optional: consistent feel across rows
                    }}
                  >
                    <Typography variant="h6">{it.title}</Typography>

                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      {it.meta?.difficulty && (
                        <Chip color={chipColor(it.meta.difficulty)} label={it.meta.difficulty}
                              onClick={(e) => { e.preventDefault(); onChipClick(it.meta!.difficulty); }} />
                      )}
                      {it.meta?.status && (
                        <Chip color={chipColor(it.meta.status)} label={it.meta.status}
                              onClick={(e) => { e.preventDefault(); onChipClick(it.meta!.status); }} />
                      )}
                      {(it.meta?.tags ?? []).slice(0, 6).map((t) => (
                        <Chip key={t} label={t}
                              onClick={(e) => { e.preventDefault(); onChipClick(t); }} />
                      ))}
                    </Stack>

                    <Typography color="text.secondary">
                      {it.meta?.description ?? ""}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      <b>Slug:</b> {it.slug}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
