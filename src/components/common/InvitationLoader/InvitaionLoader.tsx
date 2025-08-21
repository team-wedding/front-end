import logo from '@assets/woogyeol/logo_dark.png';

export default function InvitationLoader() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 mx-auto animate-spin">
          <img
            src={logo}
            alt="로고"
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </div>

        <h2 className="text-purple-700 text-xl font-semibold">
          청첩장 불러오는 중이에요
        </h2>

        <div className="flex justify-center items-center space-x-1">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    </div>
  );
}
