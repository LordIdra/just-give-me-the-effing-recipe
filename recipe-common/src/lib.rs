pub mod link;
pub mod link_blacklist;
pub mod recipe;

#[macro_export]
macro_rules! profile {
    ($name:expr) => {
        #[cfg(feature = "profiling")]
        let _span = tracy_client::span!($name);
    };
}

