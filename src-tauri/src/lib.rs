mod commands;

/// Application initialization (plugins, IPC handlers, setup hooks).
mod app_init {
    use super::commands;

    /// Register Tauri plugins on the builder.
    pub fn setup_plugins(builder: tauri::Builder<tauri::Wry>) -> tauri::Builder<tauri::Wry> {
        builder.plugin(tauri_plugin_opener::init())
    }

    /// One-time setup after the app handle exists (portable dirs, config, etc.).
    pub fn setup_app(app: &tauri::App) -> anyhow::Result<()> {
        let _handle = app.handle();
        // e.g. utils::paths::ensure_data_dir(_handle)?;
        Ok(())
    }

    pub fn generate_handlers(
    ) -> impl Fn(tauri::ipc::Invoke<tauri::Wry>) -> bool + Send + Sync + 'static {
        tauri::generate_handler![commands::greet]
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = app_init::setup_plugins(
        tauri::Builder::default().plugin(tauri_plugin_sql::Builder::new().build()),
    )
    .setup(|app| {
        app_init::setup_app(app)?;
        Ok(())
    });

    builder
        .invoke_handler(app_init::generate_handlers())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
