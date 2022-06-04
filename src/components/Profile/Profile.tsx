import { BiUserCircle } from 'react-icons/bi'
import './Profile.styles.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { UserProfile } from '../../services/Api';
import { useQuery } from 'react-query';

const Profile = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const id = user?._id ?? null
    const { data } = useQuery(["profile", id], UserProfile.getProfile)

    return (
        <header>
            <h1>Mis deudas app</h1>
            <div className="profile">
                { data ? <img alt={user?.username} src={data.picture_url} /> : <BiUserCircle size={48} /> }
            </div>
        </header>
    )
}

export default Profile