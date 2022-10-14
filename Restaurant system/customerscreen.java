import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.CardLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeListener;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.swing.Action;
import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.Timer;


public class customerscreen extends JPanel {

	private JPanel barPanel = new JPanel();
	private JPanel barPanel2 = new JPanel();
	private JPanel adPanel, infoPanel, infoChangePanel;
	private JTextField nameField, addressField, usernameField;
	private static Connection c;

	private JLayeredPane layer = new JLayeredPane();

	public customerscreen() throws SQLException {
		setBounds(0, 0, Window.getW(), Window.getH());
		setLayout(null);
		setBackground(new Color(255, 250, 205));

		adPanel = new JPanel();
		adPanel.setLayout(null);
		adPanel.setBounds(0, 100, Window.getW(), Window.getH() - 150);

		String[] pic = { "Image\\hinh_LQD.png", "Advertisement\\ad1.jpg", "Advertisement\\ad2.jpg",
				"Advertisement\\ad3.jpg" };
		JLabel picLabel = new JLabel();
		picLabel.setBounds(0, 0, Window.getW(), Window.getH() - 100);
		picLabel.setIcon(new ImageIcon(pic[0]));
		picLabel.setVisible(true);
		Timer tm = new Timer(2000, new ActionListener() {
			int picNo = 1;

			@Override
			public void actionPerformed(ActionEvent e) {

//				picLabel.setIcon(new ImageIcon(new ImageIcon(pic[picNo]).getImage().getScaledInstance(adPanel.getWidth(), adPanel.getHeight(), java.awt.Image.SCALE_SMOOTH)));
				picLabel.setIcon(new ImageIcon(pic[picNo]));
				picNo += 1;
				if (picNo >= pic.length) {
					picNo = 0;
				}
			}
		});
		picLabel.setHorizontalAlignment(JLabel.CENTER);
		adPanel.add(picLabel, SwingConstants.CENTER);
		tm.start();

		JLabel call = new JLabel();
		call.setBounds(0, 0, Window.getW(), 30);
		call.setText("For Advertisement: 0909 099 009");
		call.setVisible(true);
		call.setFont(new Font("Arial", Font.PLAIN, 20));

		adPanel.add(call, SwingConstants.CENTER);
		adPanel.setVisible(true);

		add(adPanel);

		barPanel2.setBounds(10, 10, Window.getW() - 35, 80);
		barPanel2.setLayout(null);
		barPanel2.setBackground(Color.white);
		add(barPanel2);

		barPanel.setBounds(0, 0, Window.getW(), 100);
		barPanel.setLayout(null);
		barPanel.setBackground(new Color(107, 142, 35));
		add(barPanel);

		JButton lblLogOut = new JButton("Log out");
		lblLogOut.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				LoginFrame.user.Logout();
//				Window.switchPane(new Welcome());
			}
		});
		lblLogOut.setForeground(new Color(0, 128, 0));
		lblLogOut.setFont(new Font("Sylfaen", Font.ITALIC, 30));
//		lblLogOut.setHorizontalAlignment(SwingConstants.CENTER);
		lblLogOut.setBackground(new Color(255, 255, 255));
		lblLogOut.setBounds(Window.getW() - 170, 0, 135, 80);
		lblLogOut.setBorder(BorderFactory.createEmptyBorder());
		barPanel2.add(lblLogOut);

		JButton lblProfile = new JButton("Profile");
		lblProfile.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				adPanel.setVisible(false);
				switchPane(infoPanel);
			}
		});
		lblProfile.setForeground(new Color(0, 128, 0));
		lblProfile.setBackground(new Color(255, 255, 255));
		lblProfile.setFont(new Font("Sylfaen", Font.ITALIC, 30));
		lblProfile.setBounds(Window.getW() - 304, 0, 135, 80);
		lblProfile.setBorder(BorderFactory.createEmptyBorder());
		barPanel2.add(lblProfile);

		JButton lblToOrder = new JButton("Order");
//		lblToOrder.setIcon(new ImageIcon(new ImageIcon("Image/orderButton.png").getImage().getScaledInstance(80,80, java.awt.Image.SCALE_SMOOTH)));
		lblToOrder.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Window.switchPane(new drawTable());
			}
		});
		lblToOrder.setForeground(new Color(0, 128, 0));
		lblToOrder.setBackground(new Color(255, 255, 255));
		lblToOrder.setFont(new Font("Sylfaen", Font.ITALIC, 30));
		lblToOrder.setBounds(Window.getW() - 422, 0, 118, 80);
		lblToOrder.setBorder(BorderFactory.createEmptyBorder());
		barPanel2.add(lblToOrder);

		layer.setBounds(0, 100, Window.getW(), Window.getH() - 100);
		layer.setLayout(new CardLayout(0, 0));
		add(layer);

		infoPanel = new JPanel();
		infoChangePanel = new JPanel();
		setLayerPanel(infoChangePanel);
		setLayerPanel(infoPanel);

		int xInfo = 406;
		int yInfo = 98;

		// INFO PANEL
		JLabel nameLabel = new JLabel("Name");
		nameLabel.setFont(new Font("Tahoma", Font.BOLD, 40));
		nameLabel.setForeground(Color.ORANGE);
		nameLabel.setBounds(452, 98, 126, 59);
		infoPanel.add(nameLabel);

		JLabel addressLabel = new JLabel("Address");
		addressLabel.setForeground(Color.ORANGE);
		addressLabel.setFont(new Font("Tahoma", Font.BOLD, 40));
		addressLabel.setBounds(nameLabel.getX(), nameLabel.getY() + 100, 172, 59);
		infoPanel.add(addressLabel);

		JLabel usernameLabel = new JLabel("Username");
		usernameLabel.setForeground(Color.ORANGE);
		usernameLabel.setFont(new Font("Tahoma", Font.BOLD, 40));
		usernameLabel.setBounds(nameLabel.getX(), nameLabel.getY() + 200, 215, 59);
		infoPanel.add(usernameLabel);

		JLabel usernameInfo = new JLabel(LoginFrame.user.getUsername());
		usernameInfo.setForeground(new Color(107, 142, 35));
		usernameInfo.setFont(new Font("Tahoma", Font.ITALIC, 40));
		usernameInfo.setBounds(704, 298, 653, 59);
		infoPanel.add(usernameInfo);

		JLabel addressInfo = new JLabel(LoginFrame.user.getAddress());
		addressInfo.setForeground(new Color(107, 142, 35));
		addressInfo.setFont(new Font("Tahoma", Font.ITALIC, 40));
		addressInfo.setBounds(usernameInfo.getX(), usernameInfo.getY() - 100, 653, 59);
		infoPanel.add(addressInfo);

		JLabel nameInfo = new JLabel(LoginFrame.user.getName());
		nameInfo.setForeground(new Color(107, 142, 35));
		nameInfo.setFont(new Font("Tahoma", Font.ITALIC, 40));
		nameInfo.setBounds(usernameInfo.getX(), usernameInfo.getY() - 200, 215, 59);
		infoPanel.add(nameInfo);

		JTextArea textArea = new JTextArea();
		textArea.setBounds(10, 11, 373, 622);
		textArea.setEditable(false);
		infoPanel.add(textArea);

		c = Menu.Connect();
		PreparedStatement stmt = c.prepareStatement(
				"SELECT id FROM Delivery WHERE username = '" + LoginFrame.user.getUsername() + "' GROUP BY id;");
		ResultSet result = stmt.executeQuery();
		ArrayList<Integer> tableID = new ArrayList<>();
		while (result.next()) {
			tableID.add(result.getInt("id"));
		}
		String string = "YOUR BILL HISTORY\n========================= \n";
		if (tableID.size() == 0)
			textArea.setText("You have not ordered");
		else {
			for (Integer t : tableID) {
				stmt = c.prepareStatement(
						"SELECT food, sum(unit) as sum FROM Delivery WHERE id = " + t + " group by food;");
				result = stmt.executeQuery();
				ArrayList<String> food = new ArrayList<>();
				while (result.next()) {
					food.add(result.getString("food") + "    " + result.getString("sum"));
				}
				string = string + "Bill ID: " + t + "\n\n";
				for (String f : food)
					string = string + f + "\n";
				string = string + "=======================\n";
			}
			textArea.setText(string);
		}
		textArea.setFont(new Font("Monospaced", Font.BOLD | Font.ITALIC, 25));

		JScrollPane scroll = new JScrollPane(textArea, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS,
				JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
		scroll.setBounds(10, 11, 406, 580);
		infoPanel.add(scroll);

		Button bChange = new Button("Change...");
		bChange.setFont(new Font("Berlin Sans FB Demi", Font.BOLD | Font.ITALIC, 35));
		bChange.setForeground(new Color(255, 255, 255));
		bChange.setBackground(new Color(0, 128, 0));
		infoPanel.add(bChange);
		bChange.setBounds(879, 500, 221, 50);
		bChange.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				switchPane(infoChangePanel);
			}
		});

		Button bBackAd = new Button("Back");
		bBackAd.setActionCommand("\r\n");
		bBackAd.setForeground(Color.WHITE);
		bBackAd.setFont(new Font("Berlin Sans FB Demi", Font.BOLD | Font.ITALIC, 35));
		bBackAd.setBackground(new Color(0, 128, 0));
		bBackAd.setBounds(625, 500, 221, 50);
		infoPanel.add(bBackAd);
		bBackAd.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				switchPane(adPanel);
			}
		});

		int xChange = xInfo;

		// INFO CHANGE PANEL
		JLabel nameChangeLabel = new JLabel("Name");
		nameChangeLabel.setFont(new Font("Tahoma", Font.BOLD, 40));
		nameChangeLabel.setForeground(Color.ORANGE);
		nameChangeLabel.setBounds(xChange, 98, 126, 59);
		infoChangePanel.add(nameChangeLabel);

		JLabel addressChangeLabel = new JLabel("Address");
		addressChangeLabel.setForeground(Color.ORANGE);
		addressChangeLabel.setFont(new Font("Tahoma", Font.BOLD, 40));
		addressChangeLabel.setBounds(xChange, 198, 172, 59);
		infoChangePanel.add(addressChangeLabel);

		JLabel usernameChangeLabel = new JLabel("Username");
		usernameChangeLabel.setForeground(Color.ORANGE);
		usernameChangeLabel.setFont(new Font("Tahoma", Font.BOLD, 40));
		usernameChangeLabel.setBounds(xChange, 298, 215, 59);
		infoChangePanel.add(usernameChangeLabel);

		JLabel usernameChangeInfo = new JLabel(LoginFrame.user.getUsername());
		usernameChangeInfo.setBounds(xChange + 225, 298, 215, 59);

		JLabel addressChangeInfo = new JLabel(LoginFrame.user.getAddress());
		addressChangeInfo.setBounds(xChange + 225, 198, 215, 59);

		JLabel nameChangeInfo = new JLabel(LoginFrame.user.getName());
		nameChangeInfo.setBounds(xChange + 225, 98, 215, 59);

		nameField = new JTextField();
		nameField.setBounds(xChange + 225, 104, 172, 36);

		addressField = new JTextField();
		addressField.setBounds(xChange + 225, 217, 172, 36);

		usernameField = new JTextField();

		setUpChange(nameField, nameChangeInfo);
		setUpChange(addressField, addressChangeInfo);
		setUpChange(usernameField, usernameChangeInfo);

		int btnChange = 887;
		String change = "Change";

		JButton bChangeName = new JButton(change);
		bChangeName.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				bChange(nameField, nameChangeInfo, bChangeName, change);
			}
		});
		bChangeName.setBounds(btnChange, 111, 89, 23);
		infoChangePanel.add(bChangeName);

		click(nameField, nameChangeInfo, "name");

		JButton bChangeAddress = new JButton(change);
		bChangeAddress.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				bChange(addressField, addressChangeInfo, bChangeAddress, change);
			}
		});
		bChangeAddress.setBounds(btnChange, 216, 89, 23);
		infoChangePanel.add(bChangeAddress);

		click(addressField, addressChangeInfo, "address");

		JButton bChangeUsername = new JButton("Change Password");
		bChangeUsername.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				new ChangePassword();
			}
		});
		bChangeUsername.setBounds(btnChange, 315, 150, 23);
		infoChangePanel.add(bChangeUsername);

		JButton bBack = new JButton("Back");
		bBack.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				switchPane(infoPanel);
			}
		});
		bBack.setBounds(btnChange, 400, 150, 23);
		infoChangePanel.add(bBack);
	}

	private void setLayerPanel(JPanel p) {
		p.setBounds(0, 0, Window.getW(), Window.getH() - 100);
		p.setLayout(null);
		p.setBackground(new Color(255, 250, 205));
	}

	private void setUpChange(JTextField field, JLabel label) {
		field.setColumns(10);
		field.setVisible(false);
		infoChangePanel.add(field);

		label.setForeground(new Color(107, 142, 35));
		label.setFont(new Font("Tahoma", Font.ITALIC, 40));
		infoChangePanel.add(label);
	}

	private void bChange(JTextField field, JLabel label, JButton button, String buttonName) {

		if (label.isVisible() == false) {
			label.setVisible(true);
			field.setVisible(false);
			button.setText(buttonName);
		} else {
			label.setVisible(false);
			field.setVisible(true);
		}

	}

	private void click(JTextField textField, JLabel label, String column) {
		textField.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent key) {
				if (key.getKeyCode() == KeyEvent.VK_ENTER) {
					int i;
					if (textField.getText().equals("")) {
						i = 0;
					} else {
						Menu.Update("UPDATE Authentication_Login" + " SET " + column + "= '" + textField.getText()
								+ "' WHERE username = '" + LoginFrame.user.getUsername() + "';");
						label.setText(textField.getText());
						LoginFrame.user.setName(textField.getText());
					}
					textField.setVisible(false);
					label.setVisible(true);
				}
			}
		});
	}

	private void switchPane(JPanel p) {
		layer.removeAll();
		layer.add(p);
		layer.repaint();
		layer.revalidate();
	}
}