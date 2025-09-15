import React, { Suspense, useMemo, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { marked } from 'marked';
import { findSolution, getLazyComponent } from '../registry';
import PlaygroundShell from '../shared/PlaygroundShell';
import ErrorBoundary from '../shared/ErrorBoundary';

export default function SolutionPage() {
  const { slug = '' } = useParams();
  const entry = findSolution(slug);
  const [tab, setTab] = useState<0 | 1>(0);
  const Comp = useMemo(() => (entry ? getLazyComponent(entry) : null), [entry]);

  if (!entry) {
    return (
      <Typography>
        Unknown solution: <code>{slug}</code>
      </Typography>
    );
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {}
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" fontWeight={700}>
          {entry.title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button startIcon={<ContentCopyIcon />} onClick={copyLink}>
            Copy link
          </Button>
          <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />}>
            All solutions
          </Button>
        </Stack>
      </Stack>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mt: 1.5 }}>
        <Tab label="Render" />
        <Tab label="Readme" disabled={!entry.readme} />
      </Tabs>

      {tab === 0 && Comp && (
        <Box sx={{ mt: 2 }}>
          <Suspense fallback={<div>Loading…</div>}>
            <ErrorBoundary>
              <PlaygroundShell css={entry.css}>
                <Comp />
              </PlaygroundShell>
            </ErrorBoundary>
          </Suspense>
        </Box>
      )}

      {tab === 1 && entry.readme && (
        <Box sx={{ mt: 2, color: 'text.secondary' }} dangerouslySetInnerHTML={{ __html: marked.parse(entry.readme) as string }} />
      )}
    </Paper>
  );
}
