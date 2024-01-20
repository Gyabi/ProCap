use serde::{Deserialize, Serialize};
use directories::ProjectDirs;
use std::fs;
use std::io::Write;
use std::path::Path;

/// プロジェクトデータの保存
/// 
/// # Arguments
/// 
/// * `project` - 保存するプロジェクトデータ
/// 
/// # Returns
/// 
/// * `Result<(), Box<dyn std::error::Error>>` - 保存に成功したかどうか
pub async fn save_projects(projects: Vec<Project>)-> Result<(), Box<dyn std::error::Error>> {
    // パスを取得
    let path = get_json_path();

    // 保存用データ構造を作成
    let project_data = ProjectDataJsonStruct {
        projects: projects,
    };

    // ディレクトリの存在を保証
    let dir = Path::new(&path).parent().unwrap();
    if !dir.exists() {
        fs::create_dir_all(dir)?;
    }

    // 保存
    let json = serde_json::to_string_pretty(&project_data)?;
    
    let mut fout = std::fs::OpenOptions::new()
        .write(true)
        .truncate(true)
        .create(true)
        .open(path)?;

    fout.write_all(json.as_bytes())?;

    Ok(())
}

/// プロジェクトデータの読み込み
/// 
pub async fn load_projects() -> Result<Vec<Project>, Box<dyn std::error::Error>> {
    // パスを取得
    let path = get_json_path();

    // ファイルが存在しないならデフォルト値で新規作成
    if !fs::metadata(&path).is_ok() {
        save_projects(vec![]).await?;
    }

    // 読み込み
    let json = fs::read_to_string(path)?;
    let project_data: ProjectDataJsonStruct = serde_json::from_str(&json)?;

    Ok(project_data.projects)
}

/// jsonファイルを保存するパスを取得する関数
/// 
/// # Returns
/// 
/// * `String` - jsonファイルを保存するパス
fn get_json_path() -> String {
    let project_dir = ProjectDirs::from("rs", "ProCap", "ProCap").unwrap();
    let path = project_dir.data_dir().join("project.json");

    path.to_str().unwrap().to_string()
}


// 保存用データ構造
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ProjectDataJsonStruct {
    projects: Vec<Project>,
}

/// プロジェクトデータ
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    id: String,
    project_name: String,
    description: String,
    main_path: ExplorerPath,
    git_urls: Vec<GitURL>,
    explorer_paths: Vec<ExplorerPath>,
    other_urls: Vec<OtherURL>,
}

/// エクスプローラパス
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ExplorerPath {
    id: String,
    title: String,
    path: String,
    description: String,
}

/// GitリポジトリURL
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GitURL {
    id: String,
    title: String,
    url: String,
    description: String,
}

/// その他URL
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OtherURL {
    id: String,
    title: String,
    url: String,
    description: String,
}