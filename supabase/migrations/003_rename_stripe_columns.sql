-- stripe_ 접두사를 payment_로 변경 (포트원 전환 반영)
alter table public.subscriptions rename column stripe_customer_id to payment_customer_id;
alter table public.subscriptions rename column stripe_subscription_id to payment_id;
