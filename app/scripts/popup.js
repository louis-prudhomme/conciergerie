import init, { check_db_exists, Cred, create_cred, obtain_cred, sign_up, sign_in } from "keyring"; 

const launchBackend = async () => {
    await init();
    
    console.clear();
    localStorage.clear();

    console.log(check_db_exists());
    console.log(sign_up(Cred.from("test_login", "test_pass")));
    //console.log(check_db_exists());
    //console.log(sign_in(Cred.new("test_login", "test_pass")));
    //console.log(sign_in(Cred.new("wrong", "wrong")));

    console.log(create_cred(
        Cred.from("test_login", "test_pass"),
        Cred.from("test_cred", "test_cred")
    ));

    let ptr = obtain_cred(Cred.from("test_login", "test_pass"), 
        "test_cred");
    console.log(ptr);
    let cred = new Cred(ptr.get());
    console.log(cred);
}

launchBackend();