-- subscriptions 테이블에 INSERT/UPDATE 정책 추가
-- 결제 검증 후 구독 정보를 저장하기 위해 필요

create policy "본인 구독 생성" on public.subscriptions
  for insert with check (auth.uid() = user_id);

create policy "본인 구독 수정" on public.subscriptions
  for update using (auth.uid() = user_id);
