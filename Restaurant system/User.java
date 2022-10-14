

import javax.swing.JOptionPane;



public class User {
	String username = null, password = null, role = null;
	String name;
	String address;
	String tableID = null;
	int reward;

	public User(String u, String p, String r, String n, String a) {
		username = u;
		password = p;
		role = r;
		name = n;
		address = a;
	}

	public String toString() {
		return this.getUsername() + " " + this.getPassword() + " " + this.getRole();
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public void Logout() {

		int confirm = JOptionPane.showConfirmDialog(null, "Are you sure you want to log out?", "WARNING",
				JOptionPane.YES_NO_OPTION);
		switch (confirm) {
		case JOptionPane.YES_OPTION:
			try {
				Goodbye g = new Goodbye();
				g.setVisible(true);
			} catch (InterruptedException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}

			username = null;
			password = null;
			role = null;
			name = null;
			address = null;
			tableID = null;
			return;
		case JOptionPane.NO_OPTION:
			return;
		}

	}
	
	public void logOutBank() {
		username = null;
		password = null;
		role = null;
		name = null;
		address = null;
		tableID = null;
	}

	public String getName() {
		return name;
	}

	public String getAddress() {
		return this.address;
	}

	public String getTableID() {
		return tableID;
	}

	public void setTableID(String tableID) {
		this.tableID = tableID;
	}

	public int getReward() {
		return reward;
	}

	public void setReward(int reward) {
		this.reward = reward;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setAddress(String address) {
		this.address = address;
	}
}
