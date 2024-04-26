import React from 'react';
import Button from '../../../../../shared/components/Button/Button';
import Icon from '../../../../../shared/components/Icon/Icon';
import { TopContent, Left, Month, Right } from './CalendarHeader.style';
import { useSessionContext, useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

const CalendarHeader = ({
  currentMonth,
  scrollToToday,
  scrollToPrevMonth,
  scrollToNextMonth,
}) => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>;
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
      },
    });
    if (error) {
      alert('Error logging in to Google provider with Supabase');
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }
  return (
    <TopContent>
      <Left>
        <Month>{currentMonth.format('MMMM')}</Month>
        <span>{currentMonth.year()}</span>
      </Left>
      {session ? (
        <>
          <h4>Hey there {session.user.email}</h4>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </>
      ) : (
        <>
          <Button onClick={() => googleSignIn()}>Sign In With Google</Button>
        </>
      )}
      <Right>
        <Button
          className="angle-button"
          variant="primary"
          onClick={scrollToPrevMonth}
        >
          <Icon type="angle-left" isSolid={true} size={18} top={2} />
        </Button>

        <Button
          className="today-button"
          text="Today"
          variant="primary"
          onClick={scrollToToday}
        />
        <Button
          className="angle-button"
          variant="primary"
          onClick={scrollToNextMonth}
        >
          <Icon type="angle-right" isSolid={true} size={18} top={2} />
        </Button>
      </Right>
    </TopContent>
  );
};

export default CalendarHeader;
