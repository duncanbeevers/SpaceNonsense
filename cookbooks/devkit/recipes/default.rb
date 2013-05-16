DEVKIT_INSTALL_DIR = "/home/vagrant/devkit"
DEVKIT_USER = "vagrant"
DEVKIT_GROUP = "vagrant"

# Download devkit
git DEVKIT_INSTALL_DIR do
  user DEVKIT_USER
  group DEVKIT_GROUP
  repository "https://github.com/gameclosure/devkit"
  action :sync
  notifies :run, "bash[install_devkit]"
end

# Install
bash "install_devkit" do
  action :nothing # Only run when notified about devkit repo cloning
  cwd DEVKIT_INSTALL_DIR
  user DEVKIT_USER
  group DEVKIT_GROUP
  environment({
    "USER" => DEVKIT_USER,
    "HOME" => DEVKIT_INSTALL_DIR
  })
  code "./install.sh --silent"
  notifies :create, "link[/usr/local/bin/basil]"
end

# Symlink basil
link "/usr/local/bin/basil" do
  action :nothing # Only run when notified of devkit install
  to File.join(DEVKIT_INSTALL_DIR, "bin/basil")
  owner DEVKIT_USER
  group DEVKIT_GROUP
end
