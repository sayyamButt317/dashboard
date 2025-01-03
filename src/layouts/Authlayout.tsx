import useTokenStore from '@/store/tokenstore';
import { Navigate, Outlet } from 'react-router-dom'

const Authlayout = () => {
  const token = useTokenStore((state) => state.token);
  if (token  ) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default Authlayout