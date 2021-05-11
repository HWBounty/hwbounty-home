import { useSnackbar } from "notistack";
import { useEffect } from "react"
import PassiveCoins from "../../util/getPassiveCoins";

export const GainCoins = (props)=>{
    const {enqueueSnackbar ,closeSnackbar} = useSnackbar();
    useEffect(()=>{
        PassiveCoins.enqueueSnackbar = enqueueSnackbar;
        PassiveCoins.closeSnackbar = closeSnackbar;
    },[]);
    return null;
}