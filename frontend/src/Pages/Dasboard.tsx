import Sidebar from "../Components/Sidebar"
import { useAppSelector } from "../services/hooks"

export function Dashboard ()
{

    //const accessToken = useAppSelector(())

    GetNewAccessToken();

    return (
        <div>
            <Sidebar />
        
        </div>
    )
}



const GetNewAccessToken = ()=>{
    const ExpireAt = useAppSelector((state=>state.UserDetails.AccessToken));
    console.log(ExpireAt);
}


