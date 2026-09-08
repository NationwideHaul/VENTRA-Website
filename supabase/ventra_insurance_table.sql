-- Ventra Insurance — lead backup table for the Marketing Dashboard project.
--
-- One table per brand (alongside "Road Ready Insurance", "NFI Truck Sales", …)
-- so brands never mix. /api/lead inserts here FIRST (via the service_role key),
-- then emails via Resend and forwards to the CRM.
--
-- Run once in the Supabase SQL Editor of the "NH Marketing Dashboard" project.
-- Column names match the insert in app/api/lead/route.ts.

create table if not exists "Ventra Insurance" (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  holding       text,
  brand         text,
  form_id       text,
  name          text,
  first_name    text,
  last_name     text,
  email         text,
  phone         text,
  company       text,
  payload       jsonb,
  lead_source   text,
  medium        text,
  utm           jsonb,
  page_url      text,
  ip_address    text,
  user_agent    text,
  email_status  text,   -- 'pending' | 'sent' | 'failed'
  resend_id     text,   -- Resend message id on success
  email_error   text    -- error text on failure
);

-- Lock it down: enable RLS with NO policies, so ONLY the server-side
-- service_role key (used by /api/lead) can read/write. The anon/public key
-- gets nothing — no lead data is ever exposed to the browser.
alter table "Ventra Insurance" enable row level security;
