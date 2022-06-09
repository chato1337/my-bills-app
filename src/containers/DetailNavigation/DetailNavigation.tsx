import Creditor from '../../components/Creditor/Creditor';
import Debtor from '../Debtor/Debtor';

type DetailNavigationProps = {
    screen: boolean
}

const DetailNavigation = ({ screen }: DetailNavigationProps) => {
    return (
        <div className="navigation-container">
            {
                screen ? <Creditor /> : <Debtor />
            }
        </div>
    )
}

export default DetailNavigation