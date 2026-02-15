const sidebarItems = [
  { icon: "/icons/home.svg", label: "Home" },
  { icon: "/icons/explore.svg", label: "Explore" },
  { icon: "/icons/subscriptions.svg", label: "Subscriptions" },
  { icon: "/icons/originals.svg", label: "Originals" },
  { icon: "/icons/youtube-music.svg", label: "Music" },
  { icon: "/icons/library.svg", label: "Library" },
];

function Sidebar() {
  return (
    <div className="sidebar">
      {sidebarItems.map((item) => (
        <div className="sidebar-link" key={item.label}>
          <img src={item.icon} alt="" />
          <div>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
