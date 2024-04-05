// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn get_pomodoro_config(handle: tauri::AppHandle) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("resources/.productively/pomodoro.json")
        .expect("failed to resolve resource");

    let file = std::fs::File::open(&resource_path).unwrap();

    let config: serde_json::Value = serde_json::from_reader(file).unwrap();

    config.to_string()
}

#[tauri::command]
fn set_pomodoro_config(handle: tauri::AppHandle, data: String) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("resources/.productively/pomodoro.json")
        .expect("failed to resolve resource");

    let _file = std::fs::write(&resource_path, &data).expect("failed to write to file");

    data.to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_pomodoro_config,
            set_pomodoro_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
