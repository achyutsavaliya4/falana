import Image from "next/image";

const ProfileCreatedCard = () => {
  return (
    <div className="profileCreated__card">
      <div className="profileCreated__iconWrapper">
        <Image
          src={
            process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/gifs/success-crackers.gif"
          }
          width={100}
          height={100}
          alt="Success"
          className="profileCreated__successGif"
        />
      </div>

      <h2 className="profileCreated__header">Profile Created Successfully!</h2>

      <p className="profileCreated__subHeader">
        To Access Retail Excellence, Login with your Credentials on the{" "}
        <span className="profileCreated__subHeaderBold">
          MRE Mobile Application
        </span>
      </p>
    </div>
  );
};

export default ProfileCreatedCard;
