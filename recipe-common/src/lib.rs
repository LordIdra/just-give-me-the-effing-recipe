pub mod link;
pub mod link_blacklist;
pub mod recipe;

#[macro_export]
macro_rules! profile {
    ($name:expr) => {
        let _span = tracy_client::span!($name);
    };
}

