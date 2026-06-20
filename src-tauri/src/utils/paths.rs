use anyhow::Context;
use std::fs;
use std::path::{Path, PathBuf};

pub fn ensure_dir(path: impl AsRef<Path>) -> anyhow::Result<()> {
    fs::create_dir_all(path.as_ref())
        .with_context(|| format!("failed to create directory {:?}", path.as_ref()))?;
    Ok(())
}
