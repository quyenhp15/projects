import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import java.awt.Font;
import java.awt.Color;
import javax.swing.JTextField;
import javax.swing.JPasswordField;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.awt.event.ActionEvent;
import javax.swing.JTextArea;


public class CreditCard extends JFrame {

	private JPanel loginPanel = new JPanel();
	private JLayeredPane layer = new JLayeredPane();
	private JLabel usernameLabel;
	private JLabel titleLabel = new JLabel("INTERNET BANKING SERVICE");
	private JTextField usernameField;
	private JPasswordField passwordField;
	private int balance;
	private JPanel confirmPanel = new JPanel();
	private final JLabel titleLabel_2 = new JLabel("INTERNET BANKING SERVICE");
	private String username;
	private JPanel panel = new JPanel();
	private String intro;
	private JTextArea txtrFafw = new JTextArea();
	Connection c;
	private JTextArea txtrFafw_1 = new JTextArea();

	public CreditCard() throws SQLException {
		setTitle("Credit Card");
		setVisible(true);
		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		setBounds(Window.getW() / 4, 0, 700, 700);
		getContentPane().setLayout(null);
		layer.setBounds(0, 0, 700, 700);
		getContentPane().add(layer);
		layer.setLayout(null);

		c = Menu.Connect();

		loginPanel.setBounds(0, 0, 700, 700);
		loginPanel.setLayout(null);
		usernameLabel = new JLabel("Username");
		usernameLabel.setFont(new Font("Yu Gothic Light", Font.BOLD, 30));
		usernameLabel.setBounds(46, 206, 150, 49);
		loginPanel.add(usernameLabel);

		layer.add(loginPanel);
		titleLabel.setForeground(new Color(34, 139, 34));
		titleLabel.setFont(new Font("Bauhaus 93", Font.PLAIN, 44));

		titleLabel.setBounds(87, 11, 538, 66);
		loginPanel.add(titleLabel);

		JLabel passLabel = new JLabel("Password");
		passLabel.setFont(new Font("Yu Gothic Light", Font.BOLD, 30));
		passLabel.setBounds(46, 303, 150, 49);
		loginPanel.add(passLabel);

		usernameField = new JTextField();
		usernameField.setBounds(206, 206, 419, 30);
		loginPanel.add(usernameField);
		usernameField.setColumns(10);

		passwordField = new JPasswordField();
		passwordField.setBounds(206, 303, 419, 30);
		loginPanel.add(passwordField);

		JButton bLogin = new JButton("Log in");
		bLogin.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
//				System.out.println("Click");
				try {
					login();
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		});
		bLogin.setBounds(287, 418, 127, 59);
		loginPanel.add(bLogin);

		panel.setForeground(Color.BLUE);
		panel.setBounds(10, 11, 700, 700);
//		layer.add(panel);
		panel.setLayout(null);

		JLabel titleLabel_1 = new JLabel("INTERNET BANKING SERVICE");
		titleLabel_1.setForeground(new Color(34, 139, 34));
		titleLabel_1.setFont(new Font("Bauhaus 93", Font.PLAIN, 44));
		titleLabel_1.setBounds(87, 11, 538, 66);
		panel.add(titleLabel_1);

		txtrFafw.setFont(new Font("Monospaced", Font.PLAIN, 35));
		txtrFafw.setForeground(new Color(255, 255, 255));
		txtrFafw.setBackground(new Color(107, 142, 35));
		txtrFafw.setBounds(10, 101, 657, 384);
		panel.add(txtrFafw);

		JButton bOK = new JButton("OK");
		bOK.setFont(new Font("Tahoma", Font.PLAIN, 40));
		bOK.setBackground(new Color(143, 188, 143));
		bOK.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				balance = balance - Menu.total;
				System.out.println("OK balance = " + balance);
				String t;
				if (balance >= 0)
					t = "Your account now have " + balance;
				else
					t = "Now, you owe " + (-balance) + " to the banking";
				txtrFafw_1.setText(t);
				try {
					PreparedStatement create = c.prepareStatement(
							"UPDATE Credit SET balance = " + balance + " WHERE username = '" + username + "';");
					create.executeUpdate();

					PreparedStatement stmt = c
							.prepareStatement("SELECT balance FROM Credit WHERE username = 'lqdrestaurant'");
					ResultSet result = stmt.executeQuery();
					int restaurantBalance = 0;
					while (result.next()) {
						restaurantBalance = result.getInt("balance");
					}

					System.out.println("restaurantBalance = " + restaurantBalance);
					create = c.prepareStatement("UPDATE Credit SET balance = " + (Menu.total + restaurantBalance)
							+ " WHERE username = 'lqdrestaurant';");
					create.executeUpdate();
					switchPane(confirmPanel);
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				switchPane(confirmPanel);
			}
		});
		bOK.setBounds(386, 511, 175, 66);
		panel.add(bOK);

		JButton bCancel = new JButton("Cancel");
		bCancel.setFont(new Font("Tahoma", Font.PLAIN, 40));
		bCancel.setBackground(Color.PINK);
		bCancel.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				dispose();
			}
		});
		bCancel.setBounds(87, 511, 175, 66);
		panel.add(bCancel);

		confirmPanel.setBounds(0, 0, 679, 700);
		confirmPanel.setLayout(null);
		titleLabel_2.setBounds(73, 5, 533, 65);
		titleLabel_2.setForeground(new Color(34, 139, 34));
		titleLabel_2.setFont(new Font("Bauhaus 93", Font.PLAIN, 44));

		confirmPanel.add(titleLabel_2);

		txtrFafw_1.setForeground(Color.WHITE);
		txtrFafw_1.setFont(new Font("Monospaced", Font.PLAIN, 35));
		txtrFafw_1.setBackground(new Color(107, 142, 35));
		txtrFafw_1.setBounds(54, 149, 604, 260);
		confirmPanel.add(txtrFafw_1);

		JButton btnOK = new JButton("OK");
		btnOK.setBounds(300, confirmPanel.getHeight()-200, 100, 50);
		btnOK.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				dispose();
				LoginFrame.user.logOutBank();
			}
		});
		confirmPanel.add(btnOK);
	}

	private void login() throws SQLException {
		int check = 0;
		ArrayList<String> bankAccount = Menu.Select("username", "credit");
		for (String t : bankAccount) {
			if (usernameField.getText().equals(t)) {
				check = 1;
				break;
			}
		}
		
		if (check == 0) {
			JOptionPane.showMessageDialog(null, "Incorrect account");
			return;
		}
		else {
			for (String t : bankAccount) {
				PreparedStatement stmt = c
						.prepareStatement("SELECT password, balance FROM Credit WHERE username = '" + t + "'");
				ResultSet result = stmt.executeQuery();
				if (result.next() == true) {
					if (passwordField.getText().equals(result.getString("password"))) {
						username = t;
						balance = result.getInt("balance");
						intro = "Your account have " + balance + "\n\nYour bill that you meal at\nLQD restaurant is "
								+ Menu.total + "\n\nAfter paying the bill, your\naccount have "
								+ (balance - Menu.total);
						txtrFafw.setText(intro);
//						JOptionPane.showMessageDialog(null, "OK");
						switchPane(panel);
						return;
					}
				}
			}
			JOptionPane.showMessageDialog(null, "Incorrect password");
		}
	}

	private void switchPane(JPanel p) {
		layer.removeAll();
		layer.add(p);
		layer.repaint();
		layer.revalidate();
	}

	public static void main(String[] args) throws SQLException {
		new CreditCard();
	}
}