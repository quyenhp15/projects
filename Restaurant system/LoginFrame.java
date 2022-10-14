

import javax.swing.JFrame;
import java.awt.Color;
import java.awt.EventQueue;

import javax.swing.JTextField;
import javax.swing.JPasswordField;

import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.ActionEvent;
import javax.swing.border.BevelBorder;


import java.awt.Font;
import java.awt.Image;

import javax.swing.SwingConstants;
import javax.swing.JLabel;
import javax.swing.JOptionPane;

import javax.swing.ImageIcon;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.sql.*;
import java.util.ArrayList;

public class LoginFrame extends JFrame {

//	private JFrame frame;
	private JTextField username;
	private JPasswordField password;
	private JTextField txtLogin;
	private JTextField txtLogin_1;
	private JLabel Password;
	private JLabel Validation;

	public static User user = new User("", "", "", "Guest", "");
	static ArrayList<User> arr;

	private ImageIcon icon = new ImageIcon("Image/LoginFrame.jpg");
	private Image scale = icon.getImage().getScaledInstance(500, 300, java.awt.Image.SCALE_SMOOTH);
	private Image usernameImage = new ImageIcon("Image/username.png").getImage().getScaledInstance(50, 50,
			java.awt.Image.SCALE_SMOOTH);
	private Image passwordImage = new ImageIcon("Image/password.png").getImage().getScaledInstance(50, 50,
			java.awt.Image.SCALE_SMOOTH);
	private Image xImage = new ImageIcon("Image/X.png").getImage().getScaledInstance(50, 50,
			java.awt.Image.SCALE_SMOOTH);
	private JLabel X;

	public static void main(String[] args) throws SQLException {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					LoginFrame window = new LoginFrame();
					window.setVisible(true);
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

	public static ArrayList<User> check() throws SQLException {
		Connection c = Connect();
		PreparedStatement stmt = c.prepareStatement("SELECT * FROM Authentication_Login;");
		ResultSet r = stmt.executeQuery();

		ArrayList<User> arr = new ArrayList<>();

		while (r.next()) {
			System.out.println("User: " + r.getString("username") + " pass: " + r.getString("userpassword"));
			arr.add(new User(r.getString("username"), r.getString("userpassword"), r.getString("Login_Role"),
					r.getString("name"), r.getString("address")));
		}
		return arr;
	}

	public LoginFrame() throws SQLException {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		setBackground(new Color(255, 0, 255));
		getContentPane().setBackground(new Color(192, 192, 192));
		setBounds(450, Window.getH() / 2 - 200, 500, 300);
		setResizable(false);
		setUndecorated(true);
		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		getContentPane().setLayout(null);

		X = new JLabel(new ImageIcon(xImage));
		X.setBounds(440, 11, 50, 50);
		X.addMouseListener(new MouseListener() {
			@Override
			public void mouseReleased(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mousePressed(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseExited(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseEntered(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseClicked(MouseEvent e) {
				dispose();
			}
		});
		getContentPane().add(X);

		username = new JTextField();
		username.setBounds(106, 106, 219, 29);
		getContentPane().add(username);
		username.setColumns(10);

		password = new JPasswordField();
		password.addKeyListener(new KeyAdapter() {
			@Override
			public void keyPressed(KeyEvent key) {
				if (key.getKeyCode() == KeyEvent.VK_ENTER) {
					login();

				}
			}
		});
		password.setBounds(106, 159, 219, 29);
		getContentPane().add(password);

		txtLogin = new JTextField();
		txtLogin.setBackground(new Color(0, 128, 0));
		txtLogin.setForeground(new Color(255, 255, 255));
		txtLogin.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				RegisterFrame register;
				try {
					register = new RegisterFrame();
					register.frame.setVisible(true);
					dispose();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}

			}
		});
		txtLogin.setHorizontalAlignment(SwingConstants.CENTER);
		txtLogin.setFont(new Font("Tahoma", Font.BOLD, 20));
		txtLogin.setBorder(new BevelBorder(BevelBorder.RAISED, null, null, null, null));
		txtLogin.setEditable(false);
		txtLogin.setText("Register");
		txtLogin.setBounds(120, 233, 103, 29);
		getContentPane().add(txtLogin);
		txtLogin.setColumns(10);

		txtLogin_1 = new JTextField();
		txtLogin_1.setForeground(new Color(255, 255, 255));
		txtLogin_1.setBackground(new Color(0, 128, 0));
		txtLogin_1.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				login();
			}
		});
		txtLogin_1.setHorizontalAlignment(SwingConstants.CENTER);
		txtLogin_1.setBorder(new BevelBorder(BevelBorder.RAISED, null, null, null, null));
		txtLogin_1.setEditable(false);
		txtLogin_1.setFont(new Font("Tahoma", Font.BOLD, 20));
		txtLogin_1.setText("Login");
		txtLogin_1.setBounds(290, 233, 97, 29);
		getContentPane().add(txtLogin_1);
		txtLogin_1.setColumns(10);

		JLabel Users = new JLabel(new ImageIcon(usernameImage));
		Users.setFont(new Font("Tahoma", Font.BOLD, 12));
		Users.setHorizontalAlignment(SwingConstants.LEFT);
		Users.setBackground(new Color(175, 238, 238));
		Users.setBounds(34, 94, 50, 50);
		getContentPane().add(Users);

		JLabel lblNewLabel = new JLabel("LOGIN");
		lblNewLabel.setForeground(Color.WHITE);
		lblNewLabel.setHorizontalAlignment(SwingConstants.CENTER);
		lblNewLabel.setFont(new Font("Berlin Sans FB Demi", Font.BOLD | Font.ITALIC, 70));
		lblNewLabel.setBounds(10, 11, 239, 67);
		getContentPane().add(lblNewLabel);

		Password = new JLabel(new ImageIcon(passwordImage));
		Password.setFont(new Font("Tahoma", Font.BOLD, 12));
		Password.setHorizontalAlignment(SwingConstants.LEFT);
		Password.setBounds(34, 155, 50, 54);
		getContentPane().add(Password);

		JLabel bg = new JLabel(new ImageIcon(scale));
		bg.setBounds(0, 0, 500, 300);
		getContentPane().add(bg);

		JLabel lblLqd = new JLabel("LQD Restaurant");
		lblLqd.setFont(new Font("Harlow Solid Italic", Font.ITALIC, 10));
		lblLqd.setForeground(Color.white);
		lblLqd.setBounds(0, 284, 300, 16);
		getContentPane().add(lblLqd, SwingConstants.CENTER);

	}

	public void login() {
		try {
			arr = check();
			int test = 0;
			for (User t : arr) {
				System.out.println("Checklogin " + t);
				if ((t.getUsername().equals(username.getText())) && t.getPassword().equals(password.getText())) {
					user = new User(t.getUsername(), t.getPassword(), t.getRole(), t.getName(), t.getAddress());
					test = 1;
					break;
				} else
					test = 0;
			}

			if (test == 1) {
				dispose();

				switch (user.getRole()) {
				case "Customer":
					Window.switchPane(new customerscreen());
					break;
				case "Chef":
					Window.switchPane(new chefscreen());
					break;
				case "Manager":
//					ManagerFrame m = new ManagerFrame();
//					m.setVisible(true);
//					m.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
					Window.switchPane(new ManagerFrame());
					break;

				}

				ArrayList<String> name = Menu.Select("name", "Authentication_Login",
						"username='" + username.getText() + "'");
			} else
				JOptionPane.showMessageDialog(null, "Incorrect");
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	}
}
