import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import { describe, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

async function renderComponent() {
  const mockData = {
    form: await superValidate(zod(formSchema))
  };
  return render(Page, { props: { data: mockData } });
}

describe('Settings Page', () => {
  it('renders the settings form with correct props', async () => {
    const user = userEvent.setup();
    await renderComponent();
    await user.click(screen.getByRole('button', { name: 'Submit' }));
  });
});
