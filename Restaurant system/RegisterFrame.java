
import java.awt.EventQueue;

import javax.swing.JFrame;
import java.awt.Color;
import javax.swing.JLabel;
import javax.swing.SwingConstants;

import java.awt.Font;
import javax.swing.JTextField;
import javax.swing.JList;
import javax.swing.JOptionPane;
import javax.swing.JScrollBar;
import javax.swing.JComboBox;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JPasswordField;

import java.sql.*;
import java.util.ArrayList;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JPanel;

public class RegisterFrame extends JFrame {

	public JFrame frame;
	private JTextField username, nameField, addressField;
	private JLabel lblNewLabel_4;
	private JPasswordField Pass1;
	private JPasswordField Pass2;

	ArrayList<User> userList = new ArrayList<>();
	private JLabel lblUsername;
	private JLabel lblPassword;
	private JLabel lblConfirmPassword;
	private JPanel panel_1;

	/**
	 * Launch the application.
	 * 
	 * @throws SQLException
	 */
	public static void main(String[] args) throws SQLException {
		Connection Conn = Connect();

		PreparedStatement create = Conn.prepareStatement("CREATE TABLE IF NOT EXISTS Authentication_Login ("
				+ "     username varchar(100)  Unique,\r\n" + "	 userpassword varchar(14),\r\n"
				+ "	 Login_Role varchar(20 )," + "name varchar(100)," + "address varchar(100) );");
		create.executeUpdate();

		PreparedStatement stmt = Conn.prepareStatement("SELECT * FROM Authentication_Login;");
		ResultSet r = stmt.executeQuery();
		while (r.next()) {
			System.out.println(r.getString("username") + " " + r.getString("userpassword") + " "
					+ r.getString("Login_Role") + " " + r.getString("name") + " " + r.getString("address"));
		}
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					RegisterFrame window = new RegisterFrame();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public static Connection Connect() throws SQLException {
		Connection connection = null;
		try {
			Class.forName("org.sqlite.JDBC");
			String url = "jdbc:sqlite:Restaurant.db";
			connection = DriverManager.getConnection(url);
			System.out.println("ConnectJDBC");
		} catch (ClassNotFoundException e) {
			System.out.println("ERROR :" + e.getMessage() + "/n" + e.getClass() + "/n" + e.getCause());
			e.printStackTrace();
		}
		return connection;
	}

	public RegisterFrame() throws SQLException {
		initialize();

		Connection Conn = Connect();
		PreparedStatement stmt = Conn.prepareStatement("SELECT * FROM Authentication_Login;");
		ResultSet r = stmt.executeQuery();
		while (r.next()) {
			userList.add(new User(r.getString("username"), r.getString("userpassword"), r.getString("Login_Role"),
					r.getString("name"), r.getString("address")));
		}
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.getContentPane().setBackground(new Color(192, 192, 192));
		frame.setBackground(new Color(173, 216, 230));
		frame.setUndecorated(true);
		frame.setBounds(450, 40, 531, 650);
		frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		frame.setResizable(false);

		panel_1 = new JPanel();
		panel_1.setBackground(new Color(255, 255, 255));
		panel_1.setForeground(new Color(255, 255, 255));
		panel_1.setBounds(0, 0, 531, 650);
		frame.getContentPane().add(panel_1);
		panel_1.setLayout(null);

		JButton btnNewButton = new JButton("Create ");
		btnNewButton.setFont(new Font("Tahoma", Font.BOLD, 14));
		btnNewButton.setBorder(null);
		btnNewButton.setForeground(Color.WHITE);
		btnNewButton.setBackground(Color.BLACK);
		btnNewButton.setBounds(203, 571, 111, 51);
		panel_1.add(btnNewButton);

		JLabel Close = new JLabel("");
		Close.setIcon(new ImageIcon(
				new ImageIcon("Image/X.png").getImage().getScaledInstance(53, 51, java.awt.Image.SCALE_SMOOTH)));
		Close.setBounds(478, 0, 53, 51);
		Close.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				frame.dispose();
			}
		});
		panel_1.add(Close);

		Pass2 = new JPasswordField();
		Pass2.setBounds(186, 488, 272, 33);
		panel_1.add(Pass2);

		lblConfirmPassword = new JLabel("pass");
		lblConfirmPassword.setIcon(new ImageIcon(
				new ImageIcon("Image/password.png").getImage().getScaledInstance(72, 72, java.awt.Image.SCALE_SMOOTH)));
		lblConfirmPassword.setBounds(70, 464, 72, 72);
		panel_1.add(lblConfirmPassword);
		lblConfirmPassword.setForeground(new Color(0, 0, 0));
		lblConfirmPassword.setFont(new Font("Trebuchet MS", Font.BOLD | Font.ITALIC, 21));

		Pass1 = new JPasswordField();
		Pass1.setBounds(186, 400, 269, 29);
		panel_1.add(Pass1);

		lblPassword = new JLabel("Password");
		lblPassword.setIcon(new ImageIcon(
				new ImageIcon("Image/password.png").getImage().getScaledInstance(72, 72, java.awt.Image.SCALE_SMOOTH)));
		lblPassword.setBounds(70, 374, 72, 72);
		panel_1.add(lblPassword);
		lblPassword.setForeground(new Color(0, 0, 0));
		lblPassword.setFont(new Font("Trebuchet MS", Font.BOLD | Font.ITALIC, 21));

		username = new JTextField();
		username.setBounds(186, 312, 272, 29);
		panel_1.add(username);
		username.setColumns(10);

		lblUsername = new JLabel("Username");
		lblUsername.setIcon(new ImageIcon(
				new ImageIcon("Image/username.png").getImage().getScaledInstance(72, 72, java.awt.Image.SCALE_SMOOTH)));
		lblUsername.setBounds(70, 291, 72, 72);
		panel_1.add(lblUsername);
		lblUsername.setForeground(new Color(0, 0, 0));
		lblUsername.setFont(new Font("Trebuchet MS", Font.BOLD | Font.ITALIC, 21));

		addressField = new JTextField();
		addressField.setBounds(186, 235, 272, 29);
		panel_1.add(addressField);
		addressField.setColumns(10);

		JLabel address = new JLabel("Address");
		address.setIcon(new ImageIcon(
				new ImageIcon("Image/pin.png").getImage().getScaledInstance(72, 72, java.awt.Image.SCALE_SMOOTH)));
		address.setBounds(70, 211, 72, 72);
		panel_1.add(address);
		address.setForeground(new Color(0, 0, 0));
		address.setFont(new Font("Trebuchet MS", Font.BOLD | Font.ITALIC, 21));

		JLabel name = new JLabel("");
		name.setIcon(new ImageIcon(
				new ImageIcon("Image/business.png").getImage().getScaledInstance(72, 72, java.awt.Image.SCALE_SMOOTH)));
		name.setBounds(70, 135, 72, 72);
		panel_1.add(name);
		name.setFont(new Font("Trebuchet MS", Font.BOLD | Font.ITALIC, 21));
		name.setForeground(new Color(0, 0, 0));

		nameField = new JTextField();
		nameField.setBounds(186, 161, 272, 29);
		panel_1.add(nameField);
		nameField.setColumns(10);

		JLabel lblNewLabel = new JLabel("REGISTER");
		lblNewLabel.setForeground(Color.WHITE);
		lblNewLabel.setHorizontalAlignment(SwingConstants.CENTER);
		lblNewLabel.setFont(new Font("Verdana", Font.BOLD, 40));
		lblNewLabel.setBounds(160, 61, 237, 51);
		panel_1.add(lblNewLabel);

		JLabel Back = new JLabel("");
		Back.setIcon(new ImageIcon(
				new ImageIcon("Image/3394.jpg").getImage().getScaledInstance(531, 650, java.awt.Image.SCALE_SMOOTH)));
		Back.setBounds(0, -11, 531, 650);
		panel_1.add(Back);
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				boolean bl = true;
				String pass = Pass1.getText();
				if (username.getText().isEmpty() || Pass1.getText().isEmpty()) {
					JOptionPane.showMessageDialog(null, "Your username or password is empty");
					bl = false;
					return;
				} else {
					for (User t : userList) {
						if (t.getUsername().equals(username.getText())) {
							JOptionPane.showMessageDialog(null, "Please choose another username");
							bl = false;
							return;
						}
					}
					if (Pass1.getText().equals(Pass2.getText()))
						bl = true;
					else {
						bl = false;
						JOptionPane.showMessageDialog(null, "Your password and confirm password are different");
					}
				}

				if (bl) {
					try {
						insert(username.getText(), Pass1.getText(), "Customer", nameField.getText(),
								addressField.getText());
						frame.dispose();
						JOptionPane.showMessageDialog(null, "Your account is created. Now please log in");
						LoginFrame l = new LoginFrame();
						l.setVisible(true);
					} catch (SQLException e1) {
						e1.printStackTrace();
					}
				}
			}
		});

	}

	public void insert(String username, String userpassword, String Login_Role, String name, String address)
			throws SQLException {
		String sql = "INSERT INTO Authentication_Login(username,userpassword, Login_Role,name,address) VALUES(?,?,?,?,?)";
		Connection c = Connect();
		PreparedStatement stmt = c.prepareStatement(sql);
		stmt.setString(1, username);
		stmt.setString(2, userpassword);
		stmt.setString(3, Login_Role);
		stmt.setString(4, name);
		stmt.setString(5, address);
		stmt.executeUpdate();

	}
}
