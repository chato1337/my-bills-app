import { BiUserCircle } from 'react-icons/bi'
import './Profile.styles.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useEffect } from 'react';
import { UserProfile } from '../../services/Api';
import { useQuery } from 'react-query';

const Profile = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const { data, isSuccess, isLoading } = useQuery("profile", UserProfile.getProfile)

    useEffect(() => {
        if (user && isSuccess) {
            console.log(data)
        }
    }, [user, isSuccess, data])

    return (
        <header>
            <h1>Mis deudas app</h1>
            <div className="profile">
                { isLoading && <BiUserCircle size={48} /> }
                {/* { isSuccess && <img src={data.results.picture.thumbnail} /> } */}
            </div>
        </header>
    )
}

export default Profile