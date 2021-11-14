import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./LoadingSpinner.styles.scss"

const LoadingSpinner = () => {
    return (
        <div className="load-spinner">
            <AiOutlineLoading3Quarters size={34} />
        </div>
    )
}

export default LoadingSpinner
