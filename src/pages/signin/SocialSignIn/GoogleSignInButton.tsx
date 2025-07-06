import googleIconUrl from '@assets/google-icon.png';

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth/google`;
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="hover:bg-whiteGray border-lightGray flex h-[51px] items-center gap-3 rounded-full border bg-white px-4 hover:cursor-pointer"
    >
      <img src={googleIconUrl} alt="Google Icon" className="h-[23px] w-[23px]" />
      <span className="font-['Roboto'] text-lg font-medium text-[#1F1F1F]">Google 계정으로 로그인</span>
    </button>
  );
};

export default GoogleSignInButton;
