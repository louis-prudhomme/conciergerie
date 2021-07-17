import init, { check_db_exists, Cred, sign_up } from "keyring"; 

const launchBackend = async () => {
    await init();
    
    console.log(check_db_exists());
    console.log(sign_up(Cred.new("test_login", "test_pass")));
    console.log(check_db_exists());   
}

launchBackend();