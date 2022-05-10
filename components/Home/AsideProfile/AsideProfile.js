import useUser from 'hooks/useUser';
import AsideActivity from './AsideActivity';
import { useState, useEffect } from 'react';
import { getUserOnSpanshot } from 'firebaseFunction/getUserOnSpanshot';
import AsideAboutMe from './AsideAboutMe';

const AsideProfile = () => {
  const user = useUser();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(
    () => user?.id && getUserOnSpanshot(user?.id, setUserProfile),
    [user?.id]
  );

  return (
    <div className="hidden my-7 md:block">
      {userProfile && user && (
        <>
          <AsideAboutMe
            aboutMe={userProfile.aboutMe}
            profession={userProfile.profession}
            username={userProfile.username}
            portfolio={userProfile.portfolio}
            id={userProfile.id}
            userId={user?.id}
            user={user}
          />

          <AsideActivity />
        </>
      )}
    </div>
  );
};

export default AsideProfile;
