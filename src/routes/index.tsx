import { createFileRoute } from '@tanstack/react-router';

import Home from '#components/pages/Home';
import { buildSeoHead } from '#lib/seo';

export const Route = createFileRoute('/')({
  head: () => buildSeoHead(),
  component: Home,
});
