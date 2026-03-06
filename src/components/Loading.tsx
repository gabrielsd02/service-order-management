import { ActivityIndicator } from 'react-native'
import Overlay from './Overlay';

type Props = {
    isLoading : boolean;
}

function Loading({ isLoading  }: Props) {
    if(!isLoading) return null;

    return (
        <Overlay>
            <ActivityIndicator 
                size={70}
                color={"#d8d8d8"}
            />
        </Overlay>
    )
}

export default Loading;