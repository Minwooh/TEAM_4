import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  min-width: 1276px;
  height: 1024px;

  overflow-x: hidden;
  overflow-y: hidden;
`;

//상단 바
const Header = styled.div`
  width: 100%;
  height: 78px;
  padding: 10px 20px 10px 20px;
  margin-bottom: 5px;

  display: flex;
  align-items: center;
`;

const EngLogo = styled.div``;

const HeaderBtn = styled.div`
  position: absolute;
  right: 2%;
`;
const SeeAlarm = styled.div`
  display: inline-block;
`;
const GoSetting = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

//중간
const Middle = styled.div`
  position: absolute;
  margin-top: 20px;
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BlueContainer = styled.div`
  width: 61%;
  height: auto;

  margin-bottom: 80px;
  padding: 23px 0.5% 20px 0.6%;
  flex-shrink: 0;

  border-radius: 40px;
  background: rgb(221, 229, 251);
`;

const TextBox = styled.div`
  width: 90%;
  height: 43px;

  margin-top: 17px;
  margin-left: 34px;
`;

const WelcomeText = styled.span`
  wdith: 500px;
  height: 30px;

  color: var(--Mono-5, #404040);
  font-family: SUIT-SemiBold;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;
const ButtonBox = styled.div`
  width: 99.7%;
  height: 80px;

  margin-top: 16px;
  padding: 6px;
`;
const AddCloudBtn = styled.button`
  width: 30%;
  height: 70px;

  margin-right: 10px;
  flex-shrink: 0;

  color: var(--Mono-5, #404040);
  font-family: SUIT-Bold;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;

  border: none;
  border-radius: 24px;
  background: var(--Skyblue-20, rgb(199, 222, 251));

  &:active {
    background: var(--Skyblue-50, rgb(179, 210, 255));
  }
`;
const NewTeamBtn = styled.button`
  width: 68%;
  height: 70px;
  flex-shrink: 0;

  color: var(--Mono-5, #404040);
  font-family: SUIT-Bold;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */

  border: none;
  border-radius: 24px;
  background: var(--Blue-20, rgb(203, 217, 251));

  &:active {
    background: var(--Skyblue-50, rgb(187, 206, 250));
  }
`;

//모달 새로운 팀 추가 선택시
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  width: 450px;
  height: 600px;
  flex-shrink: 0;

  border-radius: 20px;
  opacity: 0.8;
  background: var(--Blue-70, rgb(150, 179, 255));
`;
const ModalTitle = styled.div`
  margin-top: 54px;
  margin-bottom: 90px;

  padding-left: 31.8%;

  color: var(--White, #fafafa);
  font-family: SUIT-Bold;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
`;
const ModalImage = styled.div`
  width: 200px;
  height: 200px;
  flex-shrink: 0;

  margin: 0px auto;
  border-radius: 30px;
  opacity: 0.7;

  background-size: 100%;
  background-repeat: no-repeat;
`;
const InputTeamName = styled.input`
  margin-left: 80px;
  margin-top: 20px;

  display: inline-flex;
  padding: 10px 68px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  font-family: SUIT;

  border: none;
  border-radius: 50px;
  background: var(--White, #fafafa);
`;
const NextBtn = styled.button`
  display: flex;
  width: 420px;

  margin-left: 15px;
  margin-top: 110px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  color: #fafafa;
  font-family: SUIT-Bold;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */

  border: none;
  border-radius: 10px;
  background: var(--Blue-70, rgba(40, 100, 255, 0.7));

  &:active {
    background: rgb(50, 107, 255);
  }
`;

//아이콘 선택
const ImageContainer = styled.div`
  position: absolute;

  top: 150px;
  left: 60px;

  padding: 10px 7px 10px 7px;

  width: 300px;
  height: 210px;
  flex-shrink: 0;

  border-radius: 20px;
  background: var(--White, #fafafa);

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const ImageOption = styled.img`
  cursor: pointer;
  margin: 10px;
  width: 50px;
  height: 50px;
`;

const images = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
  "/images/6.png",
  "/images/7.png",
  "/images/8.png",
  "/images/9.png",
  "/images/10.png",
  "/images/11.png",
  "/images/12.png",
];

//1-2
const InputTeamTopic = styled.input`
  margin-left: 80px;
  margin-top: 20px;

  display: inline-flex;
  padding: 10px 68px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  font-family: SUIT;

  border: none;
  border-radius: 50px;
  background: var(--White, #fafafa);
`;
const InputTopicDescript = styled.input`
  margin-left: 80px;
  margin-top: 20px;

  display: inline-flex;
  padding: 10px 68px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  font-family: SUIT;

  border: none;
  border-radius: 50px;
  background: var(--White, #fafafa);
`;
const GetTeamName = styled.div`
  width: auto;
  height: 30px;

  margin-top: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: var(--White, #fafafa);
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
`;

//isModal2Open에 해당하는 모달2
const InputEmail = styled.input`
  display: flex;
  width: 260px;
  height: 35px;

  margin-top: -25px;
  margin-left: 39px;
  padding: 10px 50px 10px 80px;

  justify-content: center;
  align-items: center;
  gap: 8px;

  flex-shrink: 0;

  border: none;
  border-radius: 10px;
  background: #fff;
`;
const Modal2ContentTex = styled.div`
  margin-top: 21px;
  margin-left: 39px;

  color: var(--White, #fafafa);
  font-family: SUIT-Bold;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 27px */
`;
const Modal2EmailContainer = styled.div`
  overflow-y: auto;

  margin-left: 40px;
  margin-top: 10px;

  padding: 5px;

  width: 380px;
  height: 220px;
`;

const EmailBox = styled.div`
  position: relative;
  width: 100%;
  height: 40px;

  margin-bottom: 3.7px;
`;
const Email = styled.span`
  display: inline-flex;
  height: 16px;
  padding: 10px 20px;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  color: var(--Blue-100, #2864ff);
  font-family: SF Pro Display;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */

  border-radius: 10px;
  background: var(--White, #fafafa);
`;
const DeleteBtn = styled.button`
  position: absolute;
  right: 0;
  top: 3px;

  display: inline-flex;
  padding: 5px 10px;

  justify-content: center;
  align-items: center;
  gap: 8px;

  color: var(--Blue-100, #2864ff);
  font-family: SUIT-SemiMedium;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */

  border: none;
  border-radius: 10px;
  background: var(--White, #fafafa);
`;

const InviteButton = styled.div`
  display: flex;
  width: 410px;

  margin-left: 13px;
  margin-top: 14px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  color: #fafafa;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */

  border-radius: 10px;
  background: var(--Blue-70, rgba(40, 100, 255, 0.7));

  &:active {
    background: rgb(50, 107, 255);
  }
`;

//구름 바로 등록하기 모달
const ChooseBoxDiv = styled.div`
  margin-top: -60px;
  margin-bottom: 40px;
  padding-left: 80px;
  width: 100%;
  height: 80px;
`;
const Modal3ChooseBox = styled.select`
  display: inline-flex;
  width: 310px;
  height: 31px;

  margin-bottom: 10px;
  padding: 6px 14px 5px 103px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 86.5px;
  flex-shrink: 0;

  color: var(--Skyblue-100, #0094ff);
  font-family: SUIT-Medium;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */

  border: none;
  border-radius: 50px;
  background: var(--White, #fafafa);
`;

const ChooseTeam = Modal3ChooseBox;
const ChooseSub = Modal3ChooseBox;

const InputCloudTitle = styled.input`
  display: inline-flex;

  width: 350px;
  height: 20px;

  margin-left: 30px;
  padding: 10px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;

  color: var(--Mono-3, #848484);
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */

  border: none;
  border-radius: 10px;
  background: var(--White, #fafafa);
`;
const InputCloudContent = styled.textarea`
  display: flex;
  resize: none;
  width: 350px;
  height: 200px;

  margin-left: 30px;
  margin-top: 10px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;

  color: var(--Mono-3, #848484);
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */

  border: none;
  border-radius: 10px;
  background: var(--White, #fafafa);
`;

const AddCloudNowBtn = styled.button`
  display: flex;
  width: 420px;

  margin-left: 17px;
  margin-top: 10px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  color: #fafafa;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */

  border: none;
  border-radius: 10px;
  background: var(--Skyblue-20, rgba(0, 148, 255, 0.2));

  &:active {
    background: #6ac1fe;
  }
`;
//모달1,1-2,2,3 끝

const Text = styled.div`
  margin-top: 10px;
  padding-left: 6px;
  color: var(--Mono-5, #404040);
  font-family: SUIT-Bold;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
`;
const TeamsContainer = styled.div`
  height: auto;
  width: 98.6%;
  padding: 15px 0px 15px 1.6%;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 왼쪽 정렬 설정 */
  align-items: flex-start; /* 위 정렬 설정 */
`;

const Team = styled.div`
  width: calc(20% - 20px);
  height: calc(13vw - 20px);

  margin: 0.5% 0.8% 4px 0px;
  padding: 25px 28px 10px 28px;
  flex-shrink: 0;

  border-radius: 50px;
  background: var(--Skyblue-20, rgba(0, 148, 255, 0.2));

  @media screen and (max-width: 1443px) {
    width: calc(25% - 64px);
    height: calc(13vw - 6px);
    min-height: 148px;
  }

  &:hover .ShowMember {
    opacity: 1;
    visibility: visible;
  }

  &:actice {
    background: #0071c3;
  }
`;
const Subject = styled.div`
  height: 33px;
  width: 210px;

  color: var(--Mono-5, #404040);
  font-family: SUIT-Bold;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;

  line-height: 150%; /* 27px */
`;

const Image = styled.div`
  display: inline-block;
  width: 25%;
  height: 22%;

  margin-top: 58%;
  border-radius: 10px;
  background: #ffffff;
  flex-shrink: 0;
  position: relative;
`;

//멤버 목록보여주기
const ShowMember = styled.div`
  position: absolute;
  z-index: 1;

  top: 60%;
  left: 52%;

  width: 180px;
  height: 200px;
  flex-shrink: 0;
  transform: translateX(-2%);

  border-radius: 5px;
  padding: 10px 10px;
  opacity: 0.9;

  background: rgba(var(--White-RGB, 255, 255, 255), 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  visibility: hidden;
  transition: opacity 0.3s;
`;
const ShowMemberTitle = styled.span`
  width: 100%;
  height: 25px;

  margin-top: 4px;

  color: var(--Mono-5, #404040);
  font-family: SUIT-Bold;
  font-size: 13px;
  font-style: normal;s
  font-weight: 700;
  line-height: 150%; /* 24px */
`;
const MemberList = styled.div`
  margin-top: 3%;
  overflow-x: fixed;
  position: relative;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  height: 80%;
`;
const MemberBox = styled.div`
  position: relative;

  padding: 3px;
  margin-bottom: 3px;
  width: 97%;
  height: 14%;
  display: flex;
`;
const MemberImg = styled.div`
  width: 13%;
  height: 100%;
  border-radius: 30px;
  background: #000;
`;
const MemberName = styled.span`
  margin-top: 1%;
  margin-left: 6px;

  color: var(--Mono-5, #404040);
  font-family: SUIT-Medium;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
`;
const MemberAuth = styled.div`
  position: absolute;
  top: 4px;
  right: 5px;
  color: #0094ff;
  font-family: SUIT-Regular;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const CountCloud = styled.div`
  display: inline-block;

  vertical-align: 14px;
  width: 54%;
  height: 26px;
  padding: 10px 0px 2px 10px;
  margin-left: 15%;

  color: #fafafa;
  font-family: SUIT-Medium;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */

  flex-shrink: 0;

  border-radius: 36.775px;
  background: #3d94f7;

  @media screen and (max-width: 1578px) {
    font-size: 10px;
    margin-left: 13%;
  }

  @media screen and (max-width: 1434px) {
    font-size: 9.6px;
    margin-left: 10%;
    padding-left: 6px;
    padding-right: 6px;
  }

  @media screen and (max-width: 1342px) {
    font-size: 8.3px;
    margin-left: 9%;
    padding-left: 6px;
    padding-right: 2px;
  }
`;

const Main = () => {
  const [showMembers, setShowMembers] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModal1_2Open, setModal1_2Open] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);
  const [isModal3Open, setModal3Open] = useState(false);

  const [isChooseImgOpen, setImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [emails, setEmails] = useState([]);
  const [currentEmail, setCurrentEmail] = useState("");

  const [teamName, setTeamName] = useState("");

  const handleEmailChange = (event) => {
    setCurrentEmail(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter" && currentEmail.trim() !== "") {
      setEmails([...emails, currentEmail]);
      setCurrentEmail("");
    }
  };
  const handleDeleteEmail = (index) => {
    // 이메일 삭제 로직
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  useEffect(() => {
    const handleEnterKeyPress = (event) => {
      handleEnterPress(event);
    };

    document.addEventListener("keydown", handleEnterKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [currentEmail, emails]);

  // 팀새로 만들기 눌렀을 시 모달1 열기/닫기
  const openModal = () => {
    setModalOpen(true);
  };
  // 첫 주제 및 설명에 대한 모달1_2 열기/닫기
  const openModal1_2 = () => {
    setModal1_2Open(true);
    setModalOpen(false);
  };
  const closeModal1_2 = () => {
    setModal1_2Open(false);
  };

  //이메일로 친구 추가 모달 열기/닫기
  const openModal2 = () => {
    setModal2Open(true);
    closeModal1_2();
  };
  const closeModal2 = () => {
    setModal2Open(false);
  };

  //구름 바로 등록 모달 열기/닫기
  const openModal3 = () => {
    setModal3Open(true);
  };
  const closeModal3 = () => {
    setModal3Open(false);
  };

  //구름 여러개 중 팀 이미지 선택
  const openImages = () => {
    setImage(true);
  };
  const closeImages = () => {
    setImage(false);
  };

  const selectImage = (image) => {
    setSelectedImage(image);
    closeImages();
  };

  return (
    <Container>
      <Header>
        <EngLogo>
          <img
            src="./images/EngLogo.png"
            style={{ width: "200px" }}
            alt="영어로고"
          ></img>
        </EngLogo>
        <HeaderBtn>
          <SeeAlarm>
            <img
              src="./images/Alarm.png"
              style={{ width: "50px" }}
              alt="알람"
            ></img>
          </SeeAlarm>
          <GoSetting>
            <img
              src="./images/Setting.png"
              style={{ width: "50px" }}
              alt="설정"
            ></img>
          </GoSetting>
        </HeaderBtn>
      </Header>

      <Middle>
        <BlueContainer>
          <TextBox>
            <WelcomeText>반가워요, </WelcomeText>
            {/* 구르미 자리에 닉네임 받아오기 */}
            <WelcomeText style={{ fontFamily: "SUIT-Bold" }}>
              구르미
            </WelcomeText>
            <WelcomeText>
              님! <br />
            </WelcomeText>
            <WelcomeText>오늘도 힘차게 새로운 구름을 띄워봐요</WelcomeText>
          </TextBox>
          <ButtonBox>
            <AddCloudBtn onClick={openModal3}>구름 바로 등록</AddCloudBtn>
            <NewTeamBtn onClick={openModal}>팀 새로만들기</NewTeamBtn>
          </ButtonBox>

          {/* 구름 바로 등록 클릭 시 열리는 모달 */}
          {isModal3Open && (
            <ModalContainer>
              <ModalContent style={{ background: "rgb(165, 217, 254)" }}>
                {/* 모달 내용 */}
                <ModalTitle>구름 바로 등록하기</ModalTitle>
                <ChooseBoxDiv>
                  <ChooseTeam>
                    <option name="team" value="0" selected>
                      팀을 선택하세요
                    </option>
                    {/* 자기가 속한 팀들이 와야해요 */}
                    <option name="team" value="1">
                      뜬구름
                    </option>
                  </ChooseTeam>

                  <ChooseSub>
                    {/* 그 팀의 주제들이 와야함 */}
                    <option name="sub" value="0" selected>
                      주제를 선택하세요
                    </option>
                  </ChooseSub>
                </ChooseBoxDiv>
                <InputCloudTitle placeholder="구름의 제목을 입력하세요" />
                <InputCloudContent placeholder="구름에 대한 세부 설명을 작성해주세요" />
                <AddCloudNowBtn onClick={closeModal3}>확인</AddCloudNowBtn>
              </ModalContent>
            </ModalContainer>
          )}

          {/* 팀 새로 만들기 클릭 시 모달 */}
          {isModalOpen && (
            <ModalContainer>
              <ModalContent>
                {/* 모달 내용 */}
                <ModalTitle>새로운 팀 만들기</ModalTitle>
                <ModalImage
                  onClick={openImages}
                  style={{
                    backgroundImage: selectedImage
                      ? `url(${process.env.PUBLIC_URL + selectedImage})`
                      : `url(${process.env.PUBLIC_URL}/images/Add.png)`,
                  }}
                ></ModalImage>
                {isChooseImgOpen && (
                  <ImageContainer>
                    {images.map((image, index) => (
                      <ImageOption
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        onClick={() => selectImage(image)}
                      />
                    ))}
                  </ImageContainer>
                )}
                <InputTeamName
                  placeholder="팀 이름을 입력하세요"
                  value={teamName}
                  onChange={handleTeamNameChange}
                ></InputTeamName>

                {/* ... */}
                <NextBtn onClick={openModal1_2}>다음</NextBtn>
              </ModalContent>
            </ModalContainer>
          )}

          {isModal1_2Open && (
            <ModalContainer>
              <ModalContent>
                {/* 모달 내용 */}
                <ModalTitle style={{ marginBottom: "40px" }}>
                  새로운 팀 만들기
                </ModalTitle>
                <ModalImage
                  style={{
                    backgroundImage: `url(${
                      process.env.PUBLIC_URL + selectedImage
                    })`,
                  }}
                ></ModalImage>
                {isChooseImgOpen && (
                  <ImageContainer>
                    {images.map((image, index) => (
                      <ImageOption
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        onClick={() => selectImage(image)}
                      />
                    ))}
                  </ImageContainer>
                )}
                {/* 팀이름 받아오기 */}
                <GetTeamName>{teamName}</GetTeamName>
                <InputTeamTopic placeholder="첫 주제를 입력하세요"></InputTeamTopic>
                <InputTopicDescript placeholder="주제에 대한 간단한 설명을 입력하세요"></InputTopicDescript>
                {/* ... */}
                <NextBtn style={{ marginTop: "70px" }} onClick={openModal2}>
                  다음
                </NextBtn>
              </ModalContent>
            </ModalContainer>
          )}

          {isModal2Open && (
            <ModalContainer>
              <ModalContent style={{ height: "560px", width: "465px" }}>
                {/* Modal2 내용 */}
                <ModalTitle style={{ paddingLeft: "160px" }}>
                  멤버 초대하기
                </ModalTitle>
                <InputEmail
                  type="email"
                  placeholder="초대할 멤버의 이메일을 입력하세요"
                  value={currentEmail}
                  onChange={handleEmailChange}
                  onKeyPress={handleEnterPress}
                />
                <Modal2ContentTex>초대된 멤버</Modal2ContentTex>
                <Modal2EmailContainer>
                  {emails.map((email, index) => (
                    <EmailBox>
                      <Email key={index}>{email}</Email>
                      <DeleteBtn onClick={() => handleDeleteEmail(index)}>
                        삭제
                      </DeleteBtn>
                    </EmailBox>
                  ))}
                </Modal2EmailContainer>

                <InviteButton onClick={closeModal2}>확인</InviteButton>
              </ModalContent>
            </ModalContainer>
          )}

          <Text>참여하는 팀</Text>
          <TeamsContainer>
            {/* 활성화된 팀 */}
            <Team isBelow>
              <Subject>예시1</Subject>
              <Image
                onMouseEnter={() => setShowMembers(true)}
                onMouseLeave={() => setShowMembers(false)}
              >
                {/* <img src ="" alt="팀장이 선택한 팀 이미지"/> */}
                {showMembers && (
                  <ShowMember className="ShowMember">
                    <ShowMemberTitle>멤버 목록(</ShowMemberTitle>
                    {/* 몇명인지 카운트한 것 넣기*/}
                    <ShowMemberTitle></ShowMemberTitle>
                    <ShowMemberTitle>)</ShowMemberTitle>
                    <MemberList>
                      {/* 한명 당 MemberBox 한개 씩 */}
                      <MemberBox>
                        <MemberImg></MemberImg>
                        <MemberName>홍민우</MemberName>
                        {/* {팀장이면 권한 표시 하기} */}
                        <MemberAuth>팀장</MemberAuth>
                      </MemberBox>
                      <MemberBox>
                        <MemberImg></MemberImg>
                        <MemberName></MemberName>
                        {/* {팀장이면 권한 표시 하기} */}
                        <MemberAuth></MemberAuth>
                      </MemberBox>
                    </MemberList>
                  </ShowMember>
                )}
              </Image>
              <CountCloud>현재 구름 갯수 몇 개</CountCloud>
            </Team>
            {/* 종료된 팀 */}
            <Team isBelow style={{ background: "#b1b3ba" }}>
              <Subject style={{ color: "#fff" }}>예시1</Subject>
              <Image />
              <CountCloud
                style={{
                  background: "#fff",
                  color: "#848484",
                  paddingLeft: "32px",
                  width: "39%",
                }}
              >
                종료된 팀
              </CountCloud>
            </Team>
          </TeamsContainer>
        </BlueContainer>

        <div>
          <img src="./images/BottomLogo.png" style={{ width: "130px" }} />
        </div>
      </Middle>
    </Container>
  );
};
export default Main;
