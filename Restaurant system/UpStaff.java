import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.border.EmptyBorder;
import java.util.ArrayList;
import net.proteanit.sql.DbUtils;

import javax.swing.JComboBox;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class UpStaff extends JFrame {

	private JPanel contentPane;
	private JTextField newpass;
	private JTextField newname;
	private JTextField newaddress;
	private JTextField account;

	private JTextField txtDone;
	private JButton btnNewButton_3;
	private JButton btnNewButton_4;
	private static Connection c;
	private JComboBox comboBox;
	private JLabel lblNewLabel;
	private JLabel lblNewLabel_1;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					UpStaff frame = new UpStaff();
					frame.setUndecorated(true);
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	public UpStaff() throws SQLException {
		c = Menu.Connect();

		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		setBounds(300, 100, 684, 461);
		contentPane = new JPanel();
		contentPane.setBackground(new Color(255, 250, 205));
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);

		JButton btnNewButton = new JButton("Updatepass");
		btnNewButton.setBorder(null);
		btnNewButton.setBackground(new Color(220, 20, 60));
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					checkavailable_1();

					String query = "SELECT * FROM Authentication_Login WHERE Login_Role = 'Chef' or Login_Role = 'Manager' ORDER BY Login_Role DESC ; ";
					PreparedStatement stmt = c.prepareStatement(query);
					ResultSet rs2 = stmt.executeQuery();
					ManagerFrame.table_2.setModel(DbUtils.resultSetToTableModel(rs2));
					
				} catch (SQLException e1) {

					e1.printStackTrace();
				}

			}
		});
		btnNewButton.setBounds(120, 184, 123, 22);
		contentPane.add(btnNewButton);

		newpass = new JTextField();
		newpass.setBounds(264, 184, 254, 22);
		contentPane.add(newpass);
		newpass.setColumns(10);
		JButton btnNewButton_1 = new JButton("UpdateName");
		btnNewButton_1.setBorder(null);
		btnNewButton_1.setBackground(new Color(220, 20, 60));
		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					checkavailable_2();
					
					String query = "SELECT * FROM Authentication_Login WHERE Login_Role = 'Chef' or Login_Role = 'Manager' ORDER BY Login_Role DESC ; ";
					PreparedStatement stmt = c.prepareStatement(query);
					ResultSet rs2 = stmt.executeQuery();
					ManagerFrame.table_2.setModel(DbUtils.resultSetToTableModel(rs2));
				} catch (SQLException e1) {

					e1.printStackTrace();
				}

			}
		});
		btnNewButton_1.setBounds(120, 232, 123, 23);
		contentPane.add(btnNewButton_1);

		newname = new JTextField();
		newname.setBounds(264, 232, 254, 22);
		contentPane.add(newname);
		newname.setColumns(10);

		JButton btnNewButton_2 = new JButton("UpdateAddress");
		btnNewButton_2.setBorder(null);
		btnNewButton_2.setBackground(new Color(220, 20, 60));
		btnNewButton_2.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					checkavailable_3();

					String query = "SELECT * FROM Authentication_Login WHERE Login_Role = 'Chef' or Login_Role = 'Manager' ORDER BY Login_Role DESC ; ";
					PreparedStatement stmt = c.prepareStatement(query);
					ResultSet rs2 = stmt.executeQuery();
					ManagerFrame.table_2.setModel(DbUtils.resultSetToTableModel(rs2));
				} catch (SQLException e1) {

					e1.printStackTrace();
				}

			}
		});
		btnNewButton_2.setBounds(120, 280, 123, 29);
		contentPane.add(btnNewButton_2);

		newaddress = new JTextField();
		newaddress.setBounds(264, 280, 254, 29);
		contentPane.add(newaddress);
		newaddress.setColumns(10);

		JLabel SelectAccount = new JLabel("");
		SelectAccount.setBackground(Color.WHITE);
		SelectAccount.setHorizontalAlignment(SwingConstants.CENTER);
		SelectAccount.setIcon(new ImageIcon(
				new ImageIcon("Image/username.png").getImage().getScaledInstance(83, 71, java.awt.Image.SCALE_SMOOTH)));
		SelectAccount.setBounds(146, 96, 83, 71);
		contentPane.add(SelectAccount);

		account = new JTextField();
		account.setBounds(264, 128, 254, 28);
		contentPane.add(account);
		account.setColumns(10);

		btnNewButton_3 = new JButton("CREATE");
		btnNewButton_3.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					checkexist();
					String query = "SELECT * FROM Authentication_Login WHERE Login_Role = 'Chef' or Login_Role = 'Manager' ORDER BY Login_Role DESC ; ";

					PreparedStatement stmt = c.prepareStatement(query);
					ResultSet rs2 = stmt.executeQuery();
					ManagerFrame.table_2.setModel(DbUtils.resultSetToTableModel(rs2));
				} catch (SQLException e1) {

					e1.printStackTrace();
				}

			}
		});
		btnNewButton_3.setBackground(Color.ORANGE);
		btnNewButton_3.setBorder(null);
		btnNewButton_3.setFont(new Font("Tahoma", Font.BOLD, 13));
		btnNewButton_3.setBounds(270, 398, 106, 28);
		contentPane.add(btnNewButton_3);

		JPanel panel = new JPanel();
		panel.setBackground(new Color(107, 142, 35));
		panel.setBounds(0, 0, 684, 71);
		contentPane.add(panel);
		panel.setLayout(null);

		lblNewLabel = new JLabel("");
		lblNewLabel.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				dispose();
			}
		});
		lblNewLabel.setBounds(631, 0, 53, 60);
		lblNewLabel.setIcon(new ImageIcon(
				new ImageIcon("Image/X.png").getImage().getScaledInstance(53, 60, java.awt.Image.SCALE_SMOOTH)));

		panel.add(lblNewLabel);

		btnNewButton_4 = new JButton("DELETE");
		btnNewButton_4.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					checkdontdeletemainaccount();

					String query = "SELECT * FROM Authentication_Login WHERE Login_Role = 'Chef' or Login_Role = 'Manager' ORDER BY Login_Role DESC ; ";

					PreparedStatement stmt = c.prepareStatement(query);
					ResultSet rs2 = stmt.executeQuery();
					ManagerFrame.table_2.setModel(DbUtils.resultSetToTableModel(rs2));
				} catch (SQLException e1) {

					e1.printStackTrace();
				}

			}
		});
		btnNewButton_4.setFont(new Font("Tahoma", Font.BOLD, 13));
		btnNewButton_4.setBorder(null);
		btnNewButton_4.setForeground(new Color(0, 0, 0));
		btnNewButton_4.setBackground(Color.ORANGE);
		btnNewButton_4.setBounds(411, 398, 106, 29);
		contentPane.add(btnNewButton_4);

		comboBox = new JComboBox();
		comboBox.setBounds(264, 343, 254, 29);

		contentPane.add(comboBox);
		comboBox.addItem("Chef");
		comboBox.addItem("Manager");

		JLabel SelectRole = new JLabel("");
		SelectRole.setIcon(new ImageIcon(
				new ImageIcon("Image/manager.png").getImage().getScaledInstance(83, 71, java.awt.Image.SCALE_SMOOTH)));
		SelectRole.setHorizontalAlignment(SwingConstants.CENTER);
		SelectRole.setBounds(146, 324, 83, 71);
		contentPane.add(SelectRole);

		lblNewLabel_1 = new JLabel("New label");
		lblNewLabel_1.setBounds(0, 0, 684, 461);
		lblNewLabel_1.setIcon(new ImageIcon(new ImageIcon("Image/3802954.jpg").getImage().getScaledInstance(684, 461,
				java.awt.Image.SCALE_SMOOTH)));

		contentPane.add(lblNewLabel_1);
	}

	public void insert(String username, String userpassword, String Login_Role, String name, String address)
			throws SQLException {
		String sql = "INSERT INTO Authentication_Login (username, userpassword, Login_Role, name, address) VALUES(?,?,?,?,?)";

//		Connection c = Connect();
		PreparedStatement stmt = c.prepareStatement(sql);
		stmt.setString(1, username);
		stmt.setString(2, userpassword);
		stmt.setString(3, Login_Role);
		stmt.setString(4, name);
		stmt.setString(5, address);
		stmt.executeUpdate();

	}

	public void insert_4(String username) throws SQLException {
		String sql = "Delete from  Authentication_Login WHERE username = '" + username + "';";
//		Connection c = Connect();
		PreparedStatement stmt = c.prepareStatement(sql);
		stmt.executeUpdate();

	}

	// update passs
	public void insert_1(String username, String userpassword) throws SQLException {
		String sql = "UPDATE Authentication_Login\r\n" + "SET userpassword = '" + userpassword
				+ "' WHERE   Login_Role ='Chef' and username = '" + username + "';";
		PreparedStatement stmt = c.prepareStatement(sql);

		stmt.executeUpdate();
	}

	// update name
	public void insert_2(String username, String name) throws SQLException {
		String sql = "UPDATE Authentication_Login\r\n" + "SET name = '" + name
				+ "' WHERE  (Login_Role ='Chef' or Login_Role = 'Manager' ) and username = '" + username + "';";
		PreparedStatement stmt = c.prepareStatement(sql);

		stmt.executeUpdate();
	}

	// update address
	public void insert_3(String username, String address) throws SQLException {
		String sql = "UPDATE Authentication_Login\r\n" + "SET address = '" + address
				+ "' WHERE  Login_Role ='Chef' and username = '" + username + "';";
		PreparedStatement stmt = c.prepareStatement(sql);

		stmt.executeUpdate();
	}

	public void checkexist() throws SQLException {
		String username = account.getText();
		String sql = "SELECT username From Authentication_Login where username  ='" + username + "';";

//  		Connection c = Connect();
		PreparedStatement stmt = c.prepareStatement(sql);

		ResultSet rs = stmt.executeQuery();
		if (rs.next() == true) {
			JOptionPane.showMessageDialog(null, "Account existed");
			account.setText("");
			newpass.setText("");
			newname.setText("");
			newaddress.setText("");
		} else {
			insert(account.getText(), newpass.getText(), comboBox.getSelectedItem().toString(), newname.getText(),
					newaddress.getText());

		}
	}
	// check acc available

	public void checkavailable() throws SQLException {

		String username = account.getText();
		String sql = "SELECT username From Authentication_Login where username  ='" + username + "';";

//    		Connection c = Connect();
		PreparedStatement stmt = c.prepareStatement(sql);

		ResultSet rs = stmt.executeQuery();
		if (rs.next() == false) {
			JOptionPane.showMessageDialog(null, "Account not available");
			account.setText("");
			newpass.setText("");
			newname.setText("");
			newaddress.setText("");
		} else {
			insert_4(account.getText());

		}
	}

	public void checkdontdeletemainaccount() throws SQLException {

		if (account.getText().equals("admin")) {
			JOptionPane.showMessageDialog(null, "This is main account, can not be deleted");
		} else {
			checkavailable();

		}
	}
	// check acc available to update

	public void checkavailable_1() throws SQLException {

		String username = account.getText();
		String sql = "SELECT username From Authentication_Login where username  ='" + username + "';";

		PreparedStatement stmt = c.prepareStatement(sql);
		ResultSet rs = stmt.executeQuery();
		if (rs.next() == false) {
			JOptionPane.showMessageDialog(null, "Account not available");
			account.setText("");
			newpass.setText("");

		} else {
			insert_1(account.getText(), newpass.getText());

		}
	}

	public void checkavailable_2() throws SQLException {

		String username = account.getText();
		String sql = "SELECT username From Authentication_Login where username  ='" + username + "';";

		PreparedStatement stmt = c.prepareStatement(sql);
		ResultSet rs = stmt.executeQuery();
		if (rs.next() == false) {
			JOptionPane.showMessageDialog(null, "Account not available");
			account.setText("");
			newname.setText("");
		} else {
			insert_2(account.getText(), newname.getText());
		}
	}

	public void checkavailable_3() throws SQLException {

		String username = account.getText();
		String sql = "SELECT username From Authentication_Login where username  ='" + username + "';";

		PreparedStatement stmt = c.prepareStatement(sql);
		ResultSet rs = stmt.executeQuery();
		if (rs.next() == false) {
			JOptionPane.showMessageDialog(null, "Account not available");
			account.setText("");
			newaddress.setText("");

		} else {
			insert_3(account.getText(), newaddress.getText());
		}
	}

}