# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  game_id         :integer
#

class User < ActiveRecord::Base

  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :username, length: { maximum: 16, minimum: 4 }
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password
  after_initialize :ensure_session_token

  ## ASSOCIATIONS

  belongs_to :game
  has_one :hand, as: :player

  ## METHODS

  def join(game_id)
    self.update!(game_id: game_id)
  end

  def leave()
    self.update!(game_id: nil)
  end

  ## AUTH

  def self.generate_session_token
    token = SecureRandom.urlsafe_base64(16)
      while user.exists?(session_token: token)
        token = SecureRandom.urlsafe_base64(16)
      end
    token
  end

  def self.find_by_credentials(credentials)
    user = user.find_by(username: credentials[:username])
    return user if user && user.valid_password?(credentials[:password])
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

end