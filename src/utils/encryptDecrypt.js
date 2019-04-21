const Cryptr = require( "cryptr" );
const cryptr = new Cryptr( "myTotalySecretKey" );

export const getJasonWebToken = () => {

};

export const checkLocalStorageForInfo = () => {
    debugger;
    const length = localStorage.length;
    let user = null;
    let jwt = null;
    for( let i = 0; i < length; i++ ){
        try{
            const key = localStorage.key( i );
            const decryptKey = cryptr.decrypt( key );
            if( decryptKey === "user" ){
                const encryptedUser = localStorage.getItem( key );
                user = cryptr.decrypt( encryptedUser );
            }else if( decryptKey === "token" ){
                jwt = localStorage.getItem( key );
            }
            
        }catch( e ){
        
        }
    }
    
    return ( { user, jwt } );
    
};

export const getUserFromLocalStorage = () => {
    
    const length = localStorage.length;
    let user = null;
    for( let i = 0; i < length; i++ ){
        try{
            const key = localStorage.key( i );
            const decryptKey = cryptr.decrypt( key );
            if( decryptKey === "user" ){
                const encryptedUser = localStorage.getItem( key );
                user = cryptr.decrypt( encryptedUser );
                break;
            }
        }catch( e ){
        
        }
        
    }
    
    return user;
};

export const setUserInfoIntoLocalStorage = info => {
    
    const user = cryptr.encrypt( "user" );
    const token = cryptr.encrypt( "token" );
    const encryptedUser = cryptr.encrypt( info.user );
    const jsonWebToken = info.token;
    
    localStorage.setItem( user, encryptedUser );
    localStorage.setItem( token, jsonWebToken );
    
};

export const removeUserAndTokenFromLocalStorage = ( startFrom = 0 ) => {
    debugger;
    const length = localStorage.length;
    debugger;
    for( let i = startFrom; i < length; i++ ){
        try{
            const key = localStorage.key( i );
            const decryptKey = cryptr.decrypt( key );
            if( decryptKey === "user" || decryptKey === "token" ){
                localStorage.removeItem( key );
                removeUserAndTokenFromLocalStorage( i );
                break;
            }
            
        }catch( e ){
        
        }
    }
};
