const Cryptr = require( "cryptr" );
const cryptr = new Cryptr( "myTotalySecretKey" );

export const getJasonWebToken = () => {

};

export const getUserFromLocalStorage = () => {
    
    const length = localStorage.length;
    let user = null;
    for ( let i = 0; i < length; i++ ) {
        try {
            const key = localStorage.key( i );
            const decryptKey = cryptr.decrypt( key );
            if ( decryptKey === "user" ) {
                const encryptedUser = localStorage.getItem( key );
                user = cryptr.decrypt( encryptedUser );
                break;
            }
        } catch ( e ) {
        
        }
        
    }
    
    return user;
};
