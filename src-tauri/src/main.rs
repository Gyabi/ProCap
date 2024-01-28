#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::process::Command;
use std::path::PathBuf;

mod project;
use project::{load_projects, save_projects, ProjectContainer};


#[tauri::command]
async fn load_project_containers_command() -> Result<Vec<ProjectContainer>, String> {
  let projects = match load_projects().await {
    Ok(projects) => projects,
    Err(e) => return Err(format!("Failed to load project: {}", e)),
  };

  Ok(projects)
}

#[tauri::command]
async fn save_project_containers_command(projects: Vec<ProjectContainer>) -> Result<(), String> {
  match save_projects(projects).await {
    Ok(_) => (),
    Err(e) => return Err(format!("Failed to save project: {}", e)),
  };

  Ok(())
}

#[tauri::command]
fn open_explorer(path: String) -> Result<(), String>{
  let path_buf = PathBuf::from(path);

  // pathの存在チェック
  if !path_buf.exists() {
    return Err(format!("Path not found: {}", path_buf.to_str().unwrap()));
  }

  // パスがディレクトリであるかチェック
  if !path_buf.is_dir() {
    return Err(format!("Path is not a directory: {}", path_buf.to_str().unwrap()));
  }

  // Windowsの場合のみエクスプローラを起動
  Command::new("explorer")
    .arg(path_buf.to_str().unwrap())
    .spawn()
    .map_err(|e| format!("Failed to open explorer: {}", e))?;

  Ok(())
}

#[tauri::command]
fn open_terminal(path: String) -> Result<(), String>{
  let path_buf = PathBuf::from(path);

  // pathの存在チェック
  if !path_buf.exists() {
    return Err(format!("Path not foundk: {}", path_buf.to_str().unwrap()));
  }

  // パスがディレクトリであるかチェック
  if !path_buf.is_dir() {
    return Err(format!("Path is not a directory: {}", path_buf.to_str().unwrap()));
  }

  Command::new("cmd")
    .arg("/c")
    .arg("start")
    .arg("cmd")
    .arg("/k")
    .arg("cd")
    .arg(path_buf.to_str().unwrap())
    .spawn()
    .map_err(|e| format!("Failed to open terminal: {}", e))?;

  Ok(())
}

#[tauri::command]
fn open_vscode(path: String) -> Result<(), String>{
  let path_buf = PathBuf::from(path);

  // pathの存在チェック
  if !path_buf.exists() {
    return Err(format!("Path not found: {}", path_buf.to_str().unwrap()));
  }

  // パスがディレクトリであるかチェック
  if !path_buf.is_dir() {
    return Err(format!("Path is not a directory: {}", path_buf.to_str().unwrap()));
  }

  Command::new("cmd")
    .arg("/c")
    .arg("start")
    .arg("/min")
    .arg("code")
    .arg(path_buf.to_str().unwrap())
    .spawn()
    .map_err(|e| format!("Failed to open vscode: {}", e))?;

  Ok(())
}

#[tauri::command]
fn open_browser(url: String) -> Result<(), String>{
  Command::new("cmd")
    .arg("/c")
    .arg("start")
    .arg("/min")
    .arg(url)
    .spawn()
    .map_err(|e| format!("Failed to open browser: {}", e))?;

  Ok(())
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![load_project_containers_command, save_project_containers_command, open_explorer, open_terminal, open_vscode, open_browser])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
