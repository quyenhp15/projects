import java.awt.Button;
import java.awt.Color;
import java.awt.Font;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.sql.SQLException;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

public class Welcome extends JPanel{
	
	private Image image = new ImageIcon("Image/welcome.jpg").getImage().getScaledInstance(Window.getW(), Window.getH(), java.awt.Image.SCALE_SMOOTH);
	private JLabel bg  = new JLabel(new ImageIcon(image));
//	private static JPanel welcomePanel = new JPanel();
	
	public Welcome() {
		setBounds(0,0,Window.getW(),Window.getH());
		setLayout(null);
		setBackground(new Color(255, 250, 205));
		
		bg.setBounds(0, 0, Window.getW(), Window.getH());
		
		JPanel panel = new JPanel();
//		panel.setBackground(new Color(107, 142, 35));
//		panel.setBackground(new Color(210, 105, 30));
		panel.setBackground(new Color(160, 82, 45));
		panel.setBounds(0, 0, Window.getW(), 94);
		add(panel);
		panel.setLayout(null);
		
		JLabel bSignup = new JLabel("Sign Up");
		bSignup.setForeground(new Color(255, 255, 255));
		bSignup.setBounds(Window.getW()-132, 0, 132, 94);
		panel.add(bSignup);
		bSignup.setBackground(new Color(107, 142, 35));
		bSignup.setFont(new Font("Bauhaus 93", Font.BOLD | Font.ITALIC, 30));
		
		JLabel bLogin = new JLabel("Log In");
		bLogin.setForeground(new Color(255, 255, 255));
		bLogin.setBounds(bSignup.getX()-117, 0, 117, 94);
		panel.add(bLogin);
		bLogin.setFont(new Font("Bauhaus 93", Font.BOLD | Font.ITALIC, 30));
		bLogin.setBackground(new Color(107, 142, 35));
		
		JLabel bMenu = new JLabel("Menu");
		bMenu.setForeground(new Color(255, 255, 255));
		bMenu.setBounds(bLogin.getX()-103, 0, 103, 94);
		panel.add(bMenu);
		bMenu.setFont(new Font("Bauhaus 93", Font.BOLD | Font.ITALIC, 30));
		bMenu.setBackground(new Color(107, 142, 35));
		
		JLabel lblLqd = new JLabel("LQD");
		lblLqd.setForeground(new Color(255, 255, 255));
		lblLqd.setFont(new Font("Tahoma", Font.BOLD | Font.ITALIC, 80));
		lblLqd.setHorizontalAlignment(SwingConstants.CENTER);
		lblLqd.setBounds(10, 0, 246, 94);
		panel.add(lblLqd);
		
		JLabel lblRestaurant = new JLabel("restaurant");
		lblRestaurant.setHorizontalAlignment(SwingConstants.CENTER);
		lblRestaurant.setForeground(new Color(255, 255, 255));
		lblRestaurant.setFont(new Font("Tahoma", Font.BOLD | Font.ITALIC, 20));
		lblRestaurant.setBounds(191, 52, 140, 42);
		panel.add(lblRestaurant);
		
		bSignup.addMouseListener(new MouseListener() {
			public void mouseReleased(MouseEvent e) {
			}
			public void mousePressed(MouseEvent e) {
			}
			public void mouseExited(MouseEvent e) {
				bSignup.setForeground(Color.white);
			}
			public void mouseEntered(MouseEvent e) {
				bSignup.setForeground(new Color(210, 105, 30));
			}
			public void mouseClicked(MouseEvent e) {
				RegisterFrame register;
				try {
					register = new RegisterFrame();
					register.frame.setVisible(true);  
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
//				dispose();
			}
		});
		
		bLogin.addMouseListener(new MouseListener() {
			public void mouseReleased(MouseEvent e) {
			}
			public void mousePressed(MouseEvent e) {
			}
			public void mouseExited(MouseEvent e) {
				bLogin.setForeground(Color.white);
			}
			public void mouseEntered(MouseEvent e) {
				bLogin.setForeground(new Color(210, 105, 30));
			}
			public void mouseClicked(MouseEvent e) {
				LoginFrame login;
				try {
					login = new LoginFrame();
					login.setVisible(true);
			    login.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		});
		bMenu.addMouseListener(new MouseAdapter() {
			public void mouseExited(MouseEvent e) {
				bMenu.setForeground(Color.white);
			}
			public void mouseEntered(MouseEvent e) {
				bMenu.setForeground(new Color(210, 105, 30));
			}
			public void mouseClicked(MouseEvent e) {
				try {
					Menu m = new Menu();
					Menu.bl=false;
					m.Layer();
					m.menuLayer.removeAll();
					m.Layer();
					Window.switchPane(m);
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
			}
		});
		
		add(bg);
	}
	
	private void setupPanel(JPanel p,Color c) {
//		setBounds(0,0,Frame.getW(),Frame.getH());
		p.setLayout(null);
		p.setBackground(c);
	}
}
