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
    <div className="my-7">
      {userProfile && (
        <>
          <AsideAboutMe
            aboutMe={userProfile.aboutMe}
            profession={userProfile.profession}
            username={userProfile.username}
            id={userProfile.id}
          />

          <AsideActivity />
        </>
      )}
    </div>
  );
};

export default AsideProfile;
