import java.awt.Button;
import java.awt.CardLayout;
import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.SQLException;

import javax.swing.JFrame;
import javax.swing.JLayeredPane;
import javax.swing.JPanel;

public class Window extends JFrame {
	static JFrame fr = new JFrame();
	static JLayeredPane homeLayer = new JLayeredPane();

	public static int getW () {
		return fr.getWidth();
	}
	public static int getH() {
		return fr.getHeight();
	}
	
	public Window() {
		fr.setTitle("Frame");
		fr.setVisible(true);
		fr.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		fr.setResizable(true);
		fr.setLayout(null);
		fr.setExtendedState(JFrame.MAXIMIZED_BOTH); // Full screen

		homeLayer.setBounds(0, 0, getW(), getH());
//		homeLayer.setLayout(new CardLayout(0,0));
		homeLayer.setLayout(null);

		fr.add(homeLayer);
		
		welcomePanel();
	}
	
	public void welcomePanel() {
		JPanel homePanel = new Welcome();
		
//		Button menuButton = new Button("Menu");
//		menuButton.setBounds(0,100,50,50);
//		menuButton.addActionListener(new ActionListener() {
//			@Override
//			public void actionPerformed(ActionEvent e) {
//				CreditCard cc;
//				try {
//					cc = new CreditCard();
//					cc.setVisible(true);
//				} catch (SQLException e1) {
//					// TODO Auto-generated catch block
//					e1.printStackTrace();
//				}
//			}
//		});
//		fr.add(menuButton);

//		homePanel.add(menuButton);
		homeLayer.add(homePanel);
	}
	public static void switchPane (JPanel p) {
		homeLayer.removeAll();
		homeLayer.add(p);
		homeLayer.repaint();
		homeLayer.revalidate();
	}
	
	public static void paintDrawTable() {
		switchPane(new drawTable());
	}
	
	public static void main(String[] args) throws SQLException {
		new Window();
		System.out.println("W = "+Window.getW()+" H = "+Window.getH());
//		Connection c =Menu.Connect();
//		Menu.Update("INSERT INTO Menu values ('O203','Cheese fries',25);");
//		Menu.Update("INSERT INTO Menu values ('O102','Chocolate cupcake',23);");
//		Menu.Update("INSERT INTO Menu values ('O103','Taco',14);");
	}
}
