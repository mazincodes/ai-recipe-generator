import chefSeekLogo from '../images/chefSeekLogo.png'
function Header() {
  return (
      <header className='flex justify-center items-center md:w-full gap-4 bg-[#7ac9fa] p-2'>
        <img className="w-[150px] shadow-[0_3px_8px_rgba(0,0,0,0.3)] bg-linear-to-t from-[#738c69] to-[#88a17e] rounded-full p-2" src={chefSeekLogo} />
        <h1 className='text-4xl text-[#333] font-[poppins] p-4'>Chef Seek</h1>
      </header>
  );
}
export default Header;
// fada7a